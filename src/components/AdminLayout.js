import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { name: "Dashboard", to: "/admin", icon: "dashboard" },
    { name: "Gestión de Usuarios", to: "/admin/usuarios", icon: "users" },
    { name: "Gestión de Mentores", to: "/admin/mentores", icon: "user" },
    { name: "Gestión de Cursos", to: "/admin/cursos", icon: "book" },
    { name: "Gestión de Reservas", to: "/admin/bookings", icon: "book" },
    { name: "Configuración", to: "/admin/config", icon: "settings" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar (mobile) */}
      <div className="md:hidden bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Abrir menú lateral"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-lg font-semibold text-gray-800">Admin · Academia Pro</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Ghilmar</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center text-white font-medium">
              G
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r">
        <div className="px-6 py-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center text-white font-bold">
              AE
            </div>
            <div>
              <div className="text-lg font-semibold">Academia Pro</div>
              <div className="text-xs text-gray-500 -mt-0.5">Panel Admin</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                >
                  {/* Simple SVG icon placeholders */}
                  {item.icon === "users" && (
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                  {item.icon === "user" && (
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1c0-1.657 3.134-3 6-3s6 1.343 6 3v1" />
                    </svg>
                  )}
                  {item.icon === "book" && (
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5z" />
                    </svg>
                  )}
                  {item.icon === "settings" && (
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      <path strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.9 1.9 0 0 0 .14 1.13l.04.07a2 2 0 0 1-1.12 2.86l-.13.04a1.9 1.9 0 0 0-1.2 1.9 2 2 0 0 1-2.05 1.8l-.14-.01a1.9 1.9 0 0 0-1.6 1.12l-.06.12a2 2 0 0 1-3.68 0l-.06-.12A1.9 1.9 0 0 0 8.1 22l-.14.01a2 2 0 0 1-2.05-1.8 1.9 1.9 0 0 0-1.2-1.9l-.13-.04A2 2 0 0 1 1.7 17.2l.04-.07A1.9 1.9 0 0 0 1.9 16 1.9 1.9 0 0 0 1.7 14.9l-.04-.07A2 2 0 0 1 2.82 11.97l.13-.04a1.9 1.9 0 0 0 1.2-1.9 2 2 0 0 1 2.05-1.8l.14.01a1.9 1.9 0 0 0 1.6-1.12l.06-.12A2 2 0 0 1 11 2.8l.06.12A1.9 1.9 0 0 0 12.7 4l.14-.01a2 2 0 0 1 2.05 1.8 1.9 1.9 0 0 0 1.2 1.9l.13.04A2 2 0 0 1 22.3 6.8l-.04.07A1.9 1.9 0 0 0 22.1 8a1.9 1.9 0 0 0 .2 1.07l.04.07A2 2 0 0 1 21.18 12l-.13.04a1.9 1.9 0 0 0-1.2 1.9 2 2 0 0 1-2.05 1.8l-.14-.01a1.9 1.9 0 0 0-1.6 1.12z" />
                    </svg>
                  )}

                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t">
          <div className="text-xs text-gray-500">Usuario</div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">G</div>
            <div className="text-sm">Ghilmar</div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar (overlay) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white border-r p-4 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center text-white font-bold">
                  AE
                </div>
                <div>
                  <div className="text-lg font-semibold">Academia ProOO</div>
                  <div className="text-xs text-gray-500 -mt-0.5">Admin</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav>
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-primary transition"
                    >
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="8" strokeWidth="1.2" />
                      </svg>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:ml-64">
        <main className="min-h-screen">
          <div className="px-4 py-6 md:px-10">{children}</div>
        </main>
      </div>
    </div>
  );
}