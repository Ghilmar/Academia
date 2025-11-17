import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import CourseFormModal from "../components/CourseFormModal";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../api";
import { Link } from "react-router-dom";


export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  // Filters/search
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message || "Error cargando cursos");
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

  function openEdit(course) {
    setEditing(course);
    setModalOpen(true);
  }

  async function handleSave(payload) {
    try {
      if (payload.id) {
        const updated = await updateCourse(payload.id, payload);
        setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const created = await createCourse(payload);
        setCourses((prev) => [created, ...prev]);
      }
    } catch (err) {
      alert("Error al guardar: " + (err.message || err));
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("¿Eliminar este curso?");
    if (!ok) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("No se pudo eliminar: " + (err.message || err));
    }
  }

  const filtered = courses.filter((c) => {
    const matchQ = !q || (c.title && c.title.toLowerCase().includes(q.toLowerCase())) || (c.category && c.category.toLowerCase().includes(q.toLowerCase()));
    const matchStatus = statusFilter === "Todos" || c.status === statusFilter;
    return matchQ && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="max-w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Gestión de Cursos</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por título o categoría..."
              className="flex-1 md:w-64 px-3 py-2 rounded-md border border-gray-200 focus:ring-primary focus:border-primary"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200"
            >
              <option>Todos</option>
              <option>Publicado</option>
              <option>Borrador</option>
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
              Añadir Nuevo Curso
            </button>
          </div>
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">Cargando cursos...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">No se encontraron cursos.</td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{c.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{c.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{c.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {c.status === "Publicado" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Publicado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {c.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="px-3 py-1 text-sm bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100"
                        >
                          Eliminar
                        </button>
                        <Link
                          to={`/courses/${c.id}`}
                          className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100"
                        >
                          Ver
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <CourseFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editing}
        />
      </div>
    </AdminLayout>
  );
}