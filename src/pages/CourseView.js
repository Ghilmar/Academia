import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCourse } from "../api";

export default function CourseView() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourse(courseId);
        setCourse(data);
      } catch (err) {
        setError("No se pudo cargar el curso");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Cargando curso...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : course ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Duración</h3>
                <p>{course.duration || "No especificado"}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Nivel</h3>
                <p>{course.level || "No especificado"}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-end">
              <Link
                to="/"
                className="px-5 py-2 border rounded-md hover:bg-gray-100"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Curso no encontrado</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
