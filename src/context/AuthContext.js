// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { listenAuthState, login, logout, signInWithGoogle } from "../services/firebaseAuth";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // <-- Nuevo estado de error

  useEffect(() => {
    const unsubscribe = listenAuthState(async (currentUser) => {
      try {
        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const snap = await getDoc(userRef);

          setUser(currentUser);
          setRole(snap.exists() ? snap.data().role : null);
        } else {
          setUser(null);
          setRole(null);
        }
        setError(null); // Resetear error al cambiar de usuario
      } catch (err) {
        // Si hay error de permisos, capturarlo
        if (err.message.includes("permissions")) {
          setError("Debes iniciar sesión para acceder a esta sección.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, signInWithGoogle, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
