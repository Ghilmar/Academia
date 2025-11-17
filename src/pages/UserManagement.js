import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import UserFormModal from "../components/UserFormModal";
import { getAllUsers, createUser, updateUser, deleteUser } from "../services/userService";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Error cargando usuarios");
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

  function openEdit(user) {
    setEditing(user);
    setModalOpen(true);
  }

  async function handleSave(payload) {
    try {
      if (payload.id) {
        const updated = await updateUser(payload.id, payload);
        setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      } else {
        const created = await createUser(payload);
        setUsers((prev) => [created, ...prev]);
      }
      alert("Usuario guardado exitosamente");
    } catch (err) {
      alert("Error al guardar: " + (err.message || err));
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("¿Eliminar este usuario?");
    if (!ok) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("Usuario eliminado exitosamente");
    } catch (err) {
      alert("No se pudo eliminar: " + (err.message || err));
    }
  }

  const filtered = users.filter((u) =>
    !q ||
    u.name?.toLowerCase().includes(q.toLowerCase()) ||
    u.email?.toLowerCase().includes(q.toLowerCase()) ||
    u.role?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, email o rol..."
              className="flex-1 md:w-64 px-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => { setQ(""); }}
              className="px-3 py-2 rounded-md border bg-gray-50 text-gray-700 hover:bg-gray-100"
            >
              Limpiar
            </button>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Usuario
            </button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 text-red-600 bg-red-50 rounded">{error}</div>}

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Región</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">
                    Cargando usuarios...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{u.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{u.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === "admin" ? "bg-red-100 text-red-800" :
                        u.role === "mentor" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{u.region || "N/A"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="px-3 py-1 text-sm bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
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

        <UserFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editing}
        />
      </div>
    </AdminLayout>
  );
}
