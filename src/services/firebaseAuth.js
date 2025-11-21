// src/services/firebaseAuth.js
import { auth, db } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Observador de cambios de sesión
export function listenAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

// Login
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout
export function logout() {
  return signOut(auth);
}

// Registrar usuario
export async function registerUser(email, password, name) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(cred.user, { displayName: name });

  // Crear documento del usuario
  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    role: "apprentice",
    createdAt: new Date()
  });

  return cred.user;
}


// Registro / login con Google
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Revisar si existe en Firestore
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    // Si no existe, crear usuario automáticamente como apprentice
    await setDoc(userRef, {
      name: user.displayName || "apprentice",
      email: user.email,
      role: "apprentice",
      createdAt: new Date()
    });
  }

  return user;
}