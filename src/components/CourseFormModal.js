import React, { useEffect, useState } from "react";

export default function CourseFormModal({ isOpen, onClose, onSave, initialData = null }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Publicado");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "Publicado");
    } else {
      setTitle("");
      setCategory("");
      setDescription("");
      setStatus("Publicado");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...(initialData && initialData.id ? { id: initialData.id } : {}),
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      status
    };
    if (!payload.title) {
      alert("El título es requerido");
      return;
    }
    onSave(payload);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {initialData ? "Editar Curso" : "Añadir Nuevo Curso"}
          </h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Ej. Introducción a React"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Categoría</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="Ej. Desarrollo, Data"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Descripción breve del curso"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option>Publicado</option>
              <option>Borrador</option>
            </select>
          </div>

          <div className="pt-4 border-t flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}