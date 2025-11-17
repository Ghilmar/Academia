import React, { useEffect, useState } from "react";
import { getCourses } from "../api";
import { Link } from "react-router-dom";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCourses() {
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
    loadCourses();
  }, []);

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (courses.length === 0) return <p>No hay cursos disponibles.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div key={course.id} className="border rounded-lg p-4 shadow hover:shadow-md">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-gray-600">{course.category}</p>
          <p className="mt-2 text-sm">{course.description}</p> 
          <p className="text-sm text-gray-500">Estado: {course.status}</p>
          <Link
            to={`/courses/${course.id}`}
            className="mt-2 inline-block px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ver Curso
          </Link>
        </div>
      ))}
    </div>
  );
}
