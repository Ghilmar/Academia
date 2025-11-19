import React, { useEffect, useState } from "react";

export default function CourseFormModal({ isOpen, onClose, onSave, initialData = null }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Publicado");

  // Nuevos campos para multimedia
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]); // { url, title }
  const [pdfs, setPdfs] = useState([]); // { url, title }

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "Publicado");
      setImages(initialData.images || []);
      setVideos(initialData.videos || []);
      setPdfs(initialData.pdfs || []);
    } else {
      setTitle("");
      setCategory("");
      setDescription("");
      setStatus("Publicado");
      setImages([]);
      setVideos([]);
      setPdfs([]);
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
      status,
      images,
      videos,
      pdfs
    };
    if (!payload.title) {
      alert("El título es requerido");
      return;
    }
    onSave(payload);
    onClose();
  }

  // Helpers para agregar/eliminar multimedia
  const addImage = () => setImages([...images, ""]);
  const updateImage = (index, value) => setImages(images.map((img, i) => i === index ? value : img));
  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

  const addVideo = () => setVideos([...videos, { url: "", title: "" }]);
  const updateVideo = (index, field, value) => setVideos(videos.map((v, i) => i === index ? { ...v, [field]: value } : v));
  const removeVideo = (index) => setVideos(videos.filter((_, i) => i !== index));

  const addPdf = () => setPdfs([...pdfs, { url: "", title: "" }]);
  const updatePdf = (index, field, value) => setPdfs(pdfs.map((p, i) => i === index ? { ...p, [field]: value } : p));
  const removePdf = (index) => setPdfs(pdfs.filter((_, i) => i !== index));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-lg shadow-lg z-10">
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
          {/* Datos básicos */}
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

          {/* Imágenes */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Imágenes (URL)</label>
            {images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={img}
                  onChange={(e) => updateImage(i, e.target.value)}
                  placeholder="URL de la imagen"
                  className="flex-1 rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
                <button type="button" onClick={() => removeImage(i)} className="px-2 py-1 bg-red-500 text-white rounded-md">X</button>
              </div>
            ))}
            <button type="button" onClick={addImage} className="px-3 py-1 bg-primary text-white rounded-md">
              Agregar imagen
            </button>
          </div>

          {/* Videos */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Videos de YouTube</label>
            {videos.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={v.title}
                  onChange={(e) => updateVideo(i, "title", e.target.value)}
                  placeholder="Título del video"
                  className="flex-1 rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
                <input
                  type="text"
                  value={v.url}
                  onChange={(e) => updateVideo(i, "url", e.target.value)}
                  placeholder="URL del video de YouTube"
                  className="flex-1 rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
                <button type="button" onClick={() => removeVideo(i)} className="px-2 py-1 bg-red-500 text-white rounded-md">X</button>
              </div>
            ))}
            <button type="button" onClick={addVideo} className="px-3 py-1 bg-primary text-white rounded-md">
              Agregar video
            </button>
          </div>

          {/* PDFs */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Documentos (Google Drive)</label>
            {pdfs.map((p, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => updatePdf(i, "title", e.target.value)}
                  placeholder="Título del documento"
                  className="flex-1 rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
                <input
                  type="text"
                  value={p.url}
                  onChange={(e) => updatePdf(i, "url", e.target.value)}
                  placeholder="URL del documento de Google Drive"
                  className="flex-1 rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
                <button type="button" onClick={() => removePdf(i)} className="px-2 py-1 bg-red-500 text-white rounded-md">X</button>
              </div>
            ))}
            <button type="button" onClick={addPdf} className="px-3 py-1 bg-primary text-white rounded-md">
              Agregar documento
            </button>
          </div>

          {/* Botones */}
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
