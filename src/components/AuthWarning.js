// src/components/AuthWarning.js
import React from "react";
import { Link } from "react-router-dom";

export default function AuthWarning({ message }) {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-md flex flex-col items-center text-center">
      <svg
        className="w-12 h-12 text-yellow-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-xl font-semibold text-yellow-700 mb-2">¡Ups! Acceso restringido</h2>
      <p className="text-yellow-800 mb-4">{message || "Necesitas iniciar sesión para ver esta sección."}</p>
      <Link
        to="/auth"
        className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-md hover:bg-yellow-500 transition"
      >
        Iniciar Sesión
      </Link>
    </div>
  );
}
