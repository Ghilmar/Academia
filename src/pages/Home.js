import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MentorCard from "../components/MentorCard";
import { getCourses, getMentors } from "../api";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";



export default function Home() {
  // Estado cursos
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);

  // Estado mentores
  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [errorMentors, setErrorMentors] = useState(null);

  // Cargar cursos desde API
  useEffect(() => {
    async function loadCourses() {
      setLoadingCourses(true);
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setErrorCourses(err.message || "Error cargando cursos");
      } finally {
        setLoadingCourses(false);
      }
    }
    loadCourses();
  }, []);

  // Cargar mentores desde API
  useEffect(() => {
    async function loadMentors() {
      setLoadingMentors(true);
      try {
        const data = await getMentors();
        setMentors(data);
      } catch (err) {
        setErrorMentors(err.message || "Error cargando mentores");
      } finally {
        setLoadingMentors(false);
      }
    }
    loadMentors();
  }, []);

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="hero-bg py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                Aprende. Mejora. Acelera tu carrera profesional.
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl">
                Cursos prácticos, mentoría personalizada y una comunidad que impulsa tu crecimiento.
                Comienza hoy con un plan flexible adaptado a tus metas.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#cursos"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primaryDark transition"
                >
                  Ver cursos
                </a>
                <a
                  href="#mentores"
                  className="inline-block px-6 py-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Conoce a los mentores
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <div className="text-sm text-gray-500">Comienza con una clase gratuita</div>
                <div className="mt-4">
                  <div className="bg-gradient-to-r from-primary to-primaryDark text-white rounded-md p-4">
                    <div className="font-semibold">Clase Intro: "De Cero a Frontend"</div>
                    <div className="text-sm mt-1">20/12 · 18:00 · Online</div>
                    <button className="mt-4 px-4 py-2 bg-white text-primary rounded-md font-medium">
                      Reservar plaza
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Cursos destacados</h2>
            <a href="#cursos" className="text-sm text-primary hover:underline">Ver todos</a>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {loadingCourses ? (
              <div className="col-span-3 text-center text-gray-500">Cargando cursos...</div>
            ) : errorCourses ? (
              <div className="col-span-3 text-center text-red-600">{errorCourses}</div>
            ) : courses.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">No hay cursos disponibles.</div>
            ) : (
              courses.map((c) => (
                <div key={c.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
                  <div className="text-lg font-semibold text-gray-800">{c.title}</div>
                  <div className="text-sm text-gray-500 mt-2 flex-1">{c.description}</div>
                  <div className="mt-4">
                   <Link
                      to={`/cursos/${c.id}`}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition block text-center"
                    >
                    Ver curso
                  </Link>


                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Mentores */}
      <section id="mentores" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Nuestros mentores</h2>
            <p className="text-sm text-gray-500">Mentoría experta, sesiones 1:1</p>
          </div>

          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {loadingMentors ? (
              <div className="col-span-4 text-center text-gray-500">Cargando mentores...</div>
            ) : errorMentors ? (
              <div className="col-span-4 text-center text-red-600">{errorMentors}</div>
            ) : mentors.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500">No hay mentores disponibles.</div>
            ) : (
              mentors.map((m) => (
                <MentorCard
                  key={m.id}
                  
                  id={m.id} //cambiamos 

                  photo={m.user?.photo || ""}
                  name={m.user?.name || ""}
                  specialty={m.experience || ""}



                  phone={m.user?.phone || ""}
                  email={m.user?.email || ""}
                  
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
