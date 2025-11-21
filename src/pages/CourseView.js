import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourse } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Función para convertir URL de YouTube a embed
function getYouTubeEmbedUrl(url) {
  if (!url) return "";
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

// Función para convertir Google Drive a preview
function getDrivePreviewUrl(url) {
  if (!url) return "";
  const regExp = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
}

// Utilidad para mostrar PDF
function PdfViewer({ url, title }) {
  const previewUrl = getDrivePreviewUrl(url);
  return (
    <div className="bg-gray-50 border rounded p-2 flex flex-col items-center gap-2">
      <div className="font-bold text-gray-700">{title}</div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
        Abrir PDF
      </a>
      <iframe
        src={previewUrl}
        title={title}
        className="w-full h-48 md:h-64 border mt-2"
        style={{ minWidth: "180px" }}
      />
    </div>
  );
}

export default function CourseView() {
  //const { courseId } = useParams();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourse(id); //cambiamos courseId por id
        setCourse(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el curso");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]); //cambiamos courseId por id

  const images = course?.images ?? [];
  const videos = course?.videos ?? [];
  const pdfs = course?.pdfs ?? [];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-500">Cargando curso...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : course ? (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex items-center gap-4 mb-2">
              <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs">
                {course.category || "-"}
              </span>
            </div>

            {/* Imágenes */}
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-primary mb-2">Imágenes del curso</h2>
              {images.length ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="rounded-lg shadow-sm overflow-hidden hover:scale-105 transition">
                      <img
                        src={img}
                        alt={`Imagen ${i + 1}`}
                        className="w-full h-40 md:h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No hay imágenes disponibles de este curso.</div>
              )}
            </section>

            {/* Videos */}
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-primary mb-2">Videos del curso</h2>
              {videos.length ? (
                <div className="flex flex-col md:flex-row gap-6">
                  {videos.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full rounded shadow border overflow-hidden">
                        <iframe
                          title={v.title}
                          src={getYouTubeEmbedUrl(v.url)}
                          className="w-full h-48 md:h-56"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="mt-2 font-semibold text-sm text-gray-600 text-center">
                        {v.title}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No hay videos disponibles.</div>
              )}
            </section>

            {/* PDFs */}
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-primary mb-2">Archivos PDF y documentos</h2>
              {pdfs.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pdfs.map((pdf, i) => (
                    <PdfViewer url={pdf.url} title={pdf.title} key={i} />
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">No hay PDFs disponibles.</div>
              )}
            </section>
          </div>



        ) : (
          <div className="text-center text-gray-500">Curso no encontrado</div>
        )}
      </main>
      <Footer />
    </div>
    
  );
}
