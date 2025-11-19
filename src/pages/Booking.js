import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMentor, createBooking } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Booking() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  // UX
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getMentor(mentorId);
        setMentor(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el mentor");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [mentorId]);

  // Función para obtener la foto del mentor
  const getMentorPhoto = () => {
    if (mentor?.user?.photo && mentor.user.photo.trim() !== "") {
      return mentor.user.photo;
    } else if (mentor?.user?.name) {
      const initial = mentor.user.name.charAt(0).toUpperCase();
      return `https://via.placeholder.com/150/007bff/ffffff?text=${encodeURIComponent(initial)}`;
    } else {
      return "https://via.placeholder.com/150/cccccc/ffffff?text=Mentor";
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fullName || !email || !telefono || !fecha || !hora || !motivo) {
      alert("Completa todos los campos.");
      return;
    }

    const booking = {
      mentorId,
      mentorName: mentor?.user?.name || "",
      fullName,
      email,
      telefono,
      fecha,
      hora,
      motivo,
      status: "Pendiente",
      createdAt: new Date().toISOString()
    };

    try {
      await createBooking(booking);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      alert("No se pudo crear la reserva: " + (err.message || err));
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md px-8 py-16 flex flex-col items-center">
            <svg className="w-16 h-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#22c55e"/>
              <path d="M6 13l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-2xl font-semibold mb-2">¡Reserva completada!</h2>
            <div className="text-gray-600 text-center">
              Tu solicitud de sesión ha sido enviada.<br />
              El mentor se pondrá en contacto contigo al correo o teléfono proporcionado. <br />
              ¡Gracias por confiar en Academia Pro!
            </div>
            <Link to="/" className="mt-8 px-5 py-2 rounded-md bg-primary text-white hover:bg-primaryDark transition">
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-500">Cargando...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : mentor ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
                <img
                  src={getMentorPhoto()}
                  alt={mentor.user?.name || "Mentor"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-semibold">{mentor.user?.name || "Nombre no disponible"}</div>
                <div className="text-primary font-medium mb-1">{mentor.experience || "Especialidad no disponible"}</div>
                <div className="text-sm text-gray-500">{mentor.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Estado: {mentor.status === "Activo" ? (
                      <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-800">Activo</span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700">Inactivo</span>
                    )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700">Nombre completo</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Email de contacto</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  placeholder="Ej. +34 600 123 456"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Fecha de la sesión</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Hora de la sesión</label>
                <input
                  type="time"
                  value={hora}
                  onChange={e => setHora(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700">Motivo / Temática de la sesión</label>
                <textarea
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                  rows="3"
                  placeholder="Describe brevemente lo que deseas tratar."
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-3 mt-4">
                <Link
                  to="/"
                  className="px-5 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-primary text-white hover:bg-primaryDark transition"
                >
                  Reservar sesión
                </button>
              </div>
            </form>

            <div className="mt-12 text-center text-gray-400 text-xs">
              Al reservar una sesión, tus datos serán enviados al mentor seleccionado, <br />
              quien te contactará por los medios proporcionados para concretar la sesión.<br />
              Academia Pro no almacena datos sensibles, conforme al RGPD.
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Mentor no encontrado</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
