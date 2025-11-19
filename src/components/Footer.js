import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre Nosotros</h3>
            <p className="text-gray-400">
              Conectando mentores expertos con estudiantes apasionados por el aprendizaje.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4"></h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white transition">Inicio</a></li>
              <li><a href="#cursos" className="hover:text-white transition">Cursos</a></li>
              <li><a href="#mentores" className="hover:text-white transition">Mentores</a></li>
              <li><a href="/" className="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p className="text-gray-400">
              Email: info@gmail.com<br />
              Teléfono: 60482404
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-400">
            &copy; 2025 MentorApp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
