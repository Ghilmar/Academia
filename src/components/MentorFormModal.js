import React, { useEffect, useState } from "react";
import { createMentor, updateMentor } from "../api"; // tus funciones de Firestore
import { uploadMentorPhoto } from "../services/firebaseService";

export default function MentorFormModal({ isOpen, onClose, onSave, initialData = null }) {
  // Campos de usuario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Campos de mentor
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");
  const [certificates, setCertificates] = useState("");
  const [schedules, setSchedules] = useState("");

  // Referencias
  const [idArea, setIdArea] = useState("");
  const [idPedagogicalMethod, setIdPedagogicalMethod] = useState("");

  // Imagen
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // URL externa
  const [preview, setPreview] = useState(""); // vista previa

  useEffect(() => {
    if (initialData) {
      setName(initialData.user?.name || "");
      setEmail(initialData.user?.email || "");
      setPhone(initialData.user?.phone || "");
      setExperience(initialData.experience || "");
      setLanguages(Array.isArray(initialData.languages) ? initialData.languages.join(", ") : "");
      setCertificates(Array.isArray(initialData.certificates) ? initialData.certificates.join(", ") : "");
      setSchedules(Array.isArray(initialData.schedules) ? initialData.schedules.join(", ") : "");
      setIdArea(initialData.id_area || "");
      setIdPedagogicalMethod(initialData.id_pedagogicalMethod || "");
      setFile(null);
      setImageUrl(initialData.user?.photo || "");
      setPreview(initialData.user?.photo || "");
    } else {
      setName(""); setEmail(""); setPhone("");
      setExperience(""); setLanguages(""); setCertificates(""); setSchedules("");
      setIdArea(""); setIdPedagogicalMethod(""); setFile(null); setImageUrl(""); setPreview("");
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (imageUrl) {
      setPreview(imageUrl);
    } else {
      setPreview("");
    }
  }, [file, imageUrl]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !idArea || !idPedagogicalMethod) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const payload = {
      ...(initialData && initialData.id ? { id: initialData.id } : {}),
      experience: experience.trim(),
      languages: languages.split(",").map(l => l.trim()).filter(Boolean),
      certificates: certificates.split(",").map(c => c.trim()).filter(Boolean),
      schedules: schedules.split(",").map(s => s.trim()).filter(Boolean),
      user: {
        ...(initialData?.user?.id && { id: initialData.user.id }),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
      id_area: parseInt(idArea, 10),
      id_pedagogicalMethod: parseInt(idPedagogicalMethod, 10)
    };

    try {
      let mentor;
      if (initialData?.id) {
        mentor = await updateMentor(initialData.id, payload);
      } else {
        mentor = await createMentor(payload);
      }

      // Subir foto si hay archivo
      if (file) {
        const photoURL = await uploadMentorPhoto(file, mentor.id);
        mentor = await updateMentor(mentor.id, { ...mentor, user: { ...mentor.user, photo: photoURL } });
      } else if (imageUrl) {
        // usar URL externa
        mentor = await updateMentor(mentor.id, { ...mentor, user: { ...mentor.user, photo: imageUrl } });
      }

      onSave(mentor);
      onClose();
    } catch (err) {
      alert("Error guardando mentor: " + (err.message || err));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            {initialData ? "Editar Mentor" : "Añadir Nuevo Mentor"}
          </h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Datos de usuario */}
          <fieldset className="border border-blue-200 rounded-lg p-4">
            <legend className="text-sm font-semibold text-blue-900 px-2">📋 Datos del Usuario</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Ej. Ana Fernández García" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Ej. ana@example.com" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de celular</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Ej. 600123456" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Foto del mentor</label>
                <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="mt-1 w-full" />
                <p className="text-sm text-gray-500 mt-1">O ingresa la URL de la imagen:</p>
                <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              {preview && (
                <div className="col-span-full mt-2 flex justify-center">
                  <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full border" />
                </div>
              )}
            </div>
          </fieldset>

          {/* Datos de mentor */}
          <fieldset className="border border-green-200 rounded-lg p-4">
            <legend className="text-sm font-semibold text-green-900 px-2">🎓 Datos del Mentor</legend>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Experiencia</label>
                <textarea value={experience} onChange={e => setExperience(e.target.value)} rows="3" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Idiomas (separados por comas)</label>
                <input value={languages} onChange={e => setLanguages(e.target.value)} type="text" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Certificados (separados por comas)</label>
                <input value={certificates} onChange={e => setCertificates(e.target.value)} type="text" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Horarios disponibles (separados por comas)</label>
                <input value={schedules} onChange={e => setSchedules(e.target.value)} type="text" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
            </div>
          </fieldset>

          {/* Referencias */}
          <fieldset className="border border-purple-200 rounded-lg p-4">
            <legend className="text-sm font-semibold text-purple-900 px-2">🔗 Referencias</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Área ID *</label>
                <input value={idArea} onChange={e => setIdArea(e.target.value)} type="number" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label>Método Pedagógico ID *</label>
                <input value={idPedagogicalMethod} onChange={e => setIdPedagogicalMethod(e.target.value)} type="number" className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300" />
              </div>
            </div>
          </fieldset>

          <div className="pt-4 border-t flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{initialData ? "Actualizar" : "Crear"} Mentor</button>
          </div>
        </form>
      </div>
    </div>
  );
}
