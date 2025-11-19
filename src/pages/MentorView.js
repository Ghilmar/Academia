import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMentor } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllMentors, createMentor, updateMentor, deleteMentor } from "../services/mentorService";

export default function MentorView() {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-500">Cargando datos del mentor...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : mentor ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
                <img
                  src={getMentorPhoto()}
                  alt={mentor.user?.name || "Mentor"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 text-2xl font-bold text-gray-800">{mentor.user?.name || "Nombre no disponible"}</div>
                 
                <div className="mb-1 text-sm text-gray-500">{mentor.title || ""}</div>
          
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Sobre el mentor</h3>
                <p className="text-gray-600 mb-2">
                    {mentor.experience ||     "Mentor especializado en su área, enfocado en brindar sesiones prácticas y personalizadas para tu desarrollo profesional."}
                </p>
                <div>
                  <strong>Idimas:</strong> {mentor.languages || "No especificado"}
                  <br />
                  <strong>Cargo/Título:</strong> {mentor.title || "No especificado"}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Información de contacto</h3>
                <ul className="space-y-2">
              
                  <li>
                    <span className="font-medium">Email: </span>{mentor.user?.email || "No disponible"}
                  </li>
                  <li>
                    <span className="font-medium">Teléfono: </span>{mentor.user?.phone || "No disponible"}
                  </li>
                  <li>
                    <span className="font-medium">LinkedIn:</span>{" "}
                    {mentor.linkedin ? (
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        Perfil
                      </a>
                    ) : (
                      "No disponible"
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-end">
              <Link
                to={`/mentores/${mentor.id}/book`}
                className="px-5 py-2 rounded-md bg-primary text-white hover:bg-primaryDark transition"
              >
                Reservar sesión
              </Link>
              <Link
                to="/"
                className="px-5 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
              >
                Volver al listado
              </Link>
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
