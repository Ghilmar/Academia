import { useAuth } from "./context/AuthContext";
import AdminPage from "./pages/AdminPage";

function AdminRoute({ children }) {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>No has iniciado sesión</p>;
  if (role !== "admin") return <p>No tienes permisos</p>;

  return children;
}
