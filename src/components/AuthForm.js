import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isRegister ? "Únete a la comunidad de aprendizaje." : "Accede a tu cuenta para continuar."}
          </p>

          <form className="mt-6 space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm text-gray-600">Nombre completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Contraseña</label>
              <input
                type="password"
                placeholder="********"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              />
            </div>

            <button
              type="button"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primaryDark transition"
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary font-medium hover:underline"
            >
              {isRegister ? "Iniciar sesión" : "Registrarse"}
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            Nota: Este formulario es de demostración — sin lógica de backend.
          </div>

          <div className="mt-4 text-sm">
            <Link to="/" className="text-gray-500 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}