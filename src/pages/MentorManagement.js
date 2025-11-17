import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import MentorFormModal from "../components/MentorFormModal";
import { getAllMentors, createMentor, updateMentor, deleteMentor } from "../services/mentorService";

export default function MentorManagement() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  // Filters / search
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getAllMentors();
        setMentors(data);
      } catch (err) {
        setError(err.message || "Error cargando mentores");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(mentor) {
    setEditing(mentor);
    setModalOpen(true);
  }

  async function handleSave(payload) {
    try {
      if (payload.id) {
        const updated = await updateMentor(payload.id, payload);
        setMentors((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      } else {
        const created = await createMentor(payload);
        setMentors((prev) => [created, ...prev]);
      }
    } catch (err) {
      alert("Error al guardar: " + (err.message || err));
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("¿Eliminar este mentor?");
    if (!ok) return;
    try {
      await deleteMentor(id);
      setMentors((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert("No se pudo eliminar: " + (err.message || err));
    }
  }

  // Client-side filtering (sencillo y rápido)
  const filtered = mentors.filter((m) => {
    const matchQ =
      !q ||
      m.user?.name?.toLowerCase().includes(q.toLowerCase()) ||
      m.experience?.toLowerCase().includes(q.toLowerCase());
    const matchStatus = statusFilter === "Todos";
    return matchQ && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="max-w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Gestión de Mentores</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o experiencia..."
              className="flex-1 md:w-64 px-3 py-2 rounded-md border border-gray-200 focus:ring-primary focus:border-primary"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200"
            >
              <option>Todos</option>
            </select>

            <button
              onClick={() => { setQ(""); setStatusFilter("Todos"); }}
              className="px-3 py-2 rounded-md border bg-gray-50 text-gray-700"
            >
              Limpiar
            </button>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Añadir Nuevo Mentor
            </button>
          </div>
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiencia</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">Cargando mentores...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">No se encontraron mentores.</td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{m.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{m.user?.name || "N/A"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{m.user?.email || "N/A"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{m.user?.phone || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{m.experience || "N/A"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEdit(m)}
                          className="px-3 py-1 text-sm bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <MentorFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editing}
        />
      </div>
     </AdminLayout>
  );
}