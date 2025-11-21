import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, role } = useAuth();

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <div className="font-bold">Mi Plataforma</div>

      <div className="flex gap-4">
        {user && <span>{user.displayName}</span>}

        {/* 🔥 BOTÓN SOLO PARA ADMIN */}
        {role === "admin" && (
          <Link
            to="/admin"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Ir a Administración
          </Link>
        )}
      </div>
    </nav>
  );
}
