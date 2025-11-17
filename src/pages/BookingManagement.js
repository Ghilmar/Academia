import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { getBookingsFirebase, updateBookingFirebase, deleteBookingFirebase } from "../services/firebaseService";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      try {
        const data = await getBookingsFirebase();
        setBookings(data);
      } catch (err) {
        setError(err.message || "Error cargando reservas.");
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  async function handleDelete(id) {
    const ok = window.confirm("¿Eliminar esta reserva?");
    if (!ok) return;
    try {
      await deleteBookingFirebase(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("No se pudo eliminar: " + (err.message || err));
    }
  }

  async function handleChangeStatus(id, newStatus) {
    try {
      await updateBookingFirebase(id, { status: newStatus });
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      alert("No se pudo actualizar: " + (err.message || err));
    }
  }

  // Filtrado
  const filtered = bookings.filter((b) => {
    const matchQ =
      !q ||
      b.fullName?.toLowerCase().includes(q.toLowerCase()) ||
      b.email?.toLowerCase().includes(q.toLowerCase()) ||
      b.motivo?.toLowerCase().includes(q.toLowerCase());
    const matchStatus = statusFilter === "Todos" || b.status === statusFilter;
    return matchQ && matchStatus;
  });


  //guardar pdf
function exportPDF() {
  const doc = new jsPDF();

  doc.text("Reporte de Reservas", 14, 15);

  const tabla = filtered.map((r) => [
    r.id,
    r.mentorName || r.mentorId,
    r.fullName,
    r.fecha,
    r.hora,
  ]);

  autoTable(doc, {
    head: [["ID", "Mentor", "Estudiante", "Fecha", "Hora"]],
    body: tabla,
    startY: 20,
  });

  doc.save("reservas.pdf");
}


  //fin guardar en pdf










  return (
    <AdminLayout>
      <div className="max-w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Gestión de Reservas de Sesión</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">




            
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, email o motivo"
              className="flex-1 md:w-64 px-3 py-2 rounded-md border border-gray-200 focus:ring-primary focus:border-primary"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200"
            >
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Aceptado</option>
              <option>Rechazado</option>
              <option>Cancelado</option>
              <option>Completado</option>
            </select>
            <button
              onClick={() => { setQ(""); setStatusFilter("Todos"); }}
              className="px-3 py-2 rounded-md border bg-gray-50 text-gray-700"
            >
              Limpiar
            </button>
           
          








          </div>
        </div>


<div className="flex gap-3 mb-4">

  <button
    onClick={exportPDF}
    className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
  >
    Exportar PDF
  </button>
</div>









        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mentor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-6 text-center text-sm text-gray-500">Cargando reservas...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-6 text-center text-sm text-gray-500">No se encontraron reservas.</td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{b.fecha}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{b.hora}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{b.fullName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{b.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{b.telefono}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{b.motivo}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {b.mentorName || b.mentorId}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        value={b.status}
                        onChange={(e) => handleChangeStatus(b.id, e.target.value)}
                        className="text-xs rounded px-2 py-0.5 bg-gray-50 border"
                      >
                        <option>Pendiente</option>
                        <option>Aceptado</option>
                        <option>Rechazado</option>
                        <option>Cancelado</option>
                        <option>Completado</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}