import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}


  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
