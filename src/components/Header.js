import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, role, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  const navItems = [
    { title: "Inicio", to: "/" },
    { title: "Cursos", to: "#cursos" },
    { title: "Mentores", to: "#mentores" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center text-white font-bold">
            AE
          </div>
          <div>
            <div className="text-lg font-semibold">Academi</div>
            <div className="text-xs text-gray-500 -mt-0.5">
              Educación & Mentoría
            </div>
          </div>
        </Link>

        {/* NAV desktop */}
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

          {/* ADMIN ONLY */}
          {user && role === "admin" && (
            <Link
              to="/admin/usuarios"
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Panel Admin
            </Link>
          )}

          {/* Login / Logout */}
          {!user ? (
  <Link
    to="/auth"
    className="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
  >
    Iniciar Sesión
  </Link>
) : (
  <div className="flex items-center gap-3 ml-4">

    {/* FOTO DE PERFIL */}
    {user.photoURL && (
      <img
        src={user.photoURL}
        alt="Foto de perfil"
        className="w-10 h-10 rounded-full object-cover border border-gray-300"
      />
    )}

    {/* BOTÓN LOGOUT */}
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Cerrar Sesión
    </button>
  </div>
)}

        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            {open ? (
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <a key={item.title} href={item.to} className="p-2 text-gray-700">
              {item.title}
            </a>
          ))}

          {/* ADMIN */}
          {user && role === "admin" && (
            <Link
              to="/admin/usuarios"
              className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Ingresar a Administración
            </Link>
          )}

          {!user ? (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="p-2 bg-primary text-white rounded-md text-center"
            >
              Iniciar Sesión
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500 text-white rounded-md text-center"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}
