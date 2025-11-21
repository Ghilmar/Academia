// src/components/AuthForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { login, registerUser, signInWithGoogle } from "../services/firebaseAuth";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, role } = useAuth();

  // Redirige automáticamente si ya está logueado
  if (user) {
    if (role === "admin") navigate("/admin/usuarios");
    else navigate("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error("El nombre es obligatorio");
        await registerUser(email, password, name);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
      return;
    }
  }

  async function handleGoogleLogin() {
    setError("");
    try {
      await signInWithGoogle();
      // redirige según rol
      if (role === "admin") navigate("/admin/usuarios");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión con Google");
    }
  }

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">

          <h2 className="text-2xl font-semibold text-gray-800">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h2>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {isRegister && (
              <div>
                <label className="block text-sm text-gray-600">Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm px-3 py-2"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primaryDark transition"
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              {isRegister ? "Registrarse con Google" : "Ingresar con Google"}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600 text-center">
            {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary font-medium hover:underline"
            >
              {isRegister ? "Iniciar sesión" : "Registrarse"}
            </button>
          </div>

          <div className="mt-4 text-sm text-center">
            <Link to="/" className="text-gray-500 hover:underline">
              Volver al inicio
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
