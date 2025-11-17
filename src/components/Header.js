import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { title: "Inicio", to: "/" },
    { title: "Cursos", to: "#cursos" },
    { title: "Mentores", to: "#mentores" }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center text-white font-bold">
              AE
            </div>
            <div>
              <div className="text-lg font-semibold">Academia Pro</div>
              <div className="text-xs text-gray-500 -mt-0.5">Educación & Mentoría</div>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.to}
              className="text-gray-700 hover:text-primary transition"
            >
              {item.title}
            </a>
          ))}
          <Link
            to="/auth"
            className="ml-4 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition"
          >
            Iniciar Sesión / Registro
          </Link>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a key={item.title} href={item.to} className="py-2 text-gray-700 hover:text-primary">
                {item.title}
              </a>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="py-2 inline-block px-4 bg-primary text-white rounded-md text-center"
            >
              Iniciar Sesión / Registro
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}