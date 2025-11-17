import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, getDocs, addDoc, doc, getDoc, 
  updateDoc, deleteDoc, query, where 
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyCfUfmWgl5Ji0izpz0bq8kmphGXQv8Jzpc",
  authDomain: "academia-a52b0.firebaseapp.com",
  projectId: "academia-a52b0",
  //storageBucket: "academia-a52b0.firebasestorage.app",
  storageBucket: "academia-a52b0.appspot.com",
  messagingSenderId: "285423680506",
  appId: "1:285423680506:web:5ac9ff5c1cbc1d49304243",
  measurementId: "G-HNJCC2PJQY"
};

let db;
let storage;

export function initFirebase() {
  if (!db) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
  }
  return {db, storage};
}



/* ---------------------- MENTORS ---------------------- */
export async function getMentorsFirebase() {
  const {db} = initFirebase();
  const snapshot = await getDocs(collection(db, "mentors"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getMentorFirebase(id) {
  initFirebase();
  const docRef = doc(db, "mentors", String(id));
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Mentor no encontrado");
  return { id: snap.id, ...snap.data() };
}

export async function createMentorFirebase(data) {
  initFirebase();
  const col = collection(db, "mentors");
  const ref = await addDoc(col, data);
  return { id: ref.id, ...data };
}

export async function updateMentorFirebase(id, data) {
  initFirebase();
  const docRef = doc(db, "mentors", String(id));
  await updateDoc(docRef, data);
  return { id, ...data };
}

export async function deleteMentorFirebase(id) {
  initFirebase();
  const docRef = doc(db, "mentors", String(id));
  await deleteDoc(docRef);
  return true;
}

/* ---------------------- USERS ---------------------- */
export async function getUsersFirebase() {
  initFirebase();
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getUserFirebase(id) {
  initFirebase();
  const docRef = doc(db, "users", String(id));
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Usuario no encontrado");
  return { id: snap.id, ...snap.data() };
}

export async function createUserFirebase(data) {
  initFirebase();
  const col = collection(db, "users");
  const ref = await addDoc(col, data);
  return { id: ref.id, ...data };
}

export async function updateUserFirebase(id, data) {
  initFirebase();
  const docRef = doc(db, "users", String(id));
  await updateDoc(docRef, data);
  return { id, ...data };
}

export async function deleteUserFirebase(id) {
  initFirebase();
  const docRef = doc(db, "users", String(id));
  await deleteDoc(docRef);
  return true;
}

/* ---------------------- COURSES ---------------------- */
export async function getCoursesFirebase() {
  initFirebase();
  const snapshot = await getDocs(collection(db, "courses"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getCourseFirebase(id) {
  initFirebase();
  const docRef = doc(db, "courses", String(id));
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Curso no encontrado");
  return { id: snap.id, ...snap.data() };
}

export async function createCourseFirebase(data) {
  initFirebase();
  const col = collection(db, "courses");
  const ref = await addDoc(col, data);
  return { id: ref.id, ...data };
}

export async function updateCourseFirebase(id, data) {
  initFirebase();
  const docRef = doc(db, "courses", String(id));
  await updateDoc(docRef, data);
  return { id, ...data };
}

export async function deleteCourseFirebase(id) {
  initFirebase();
  const docRef = doc(db, "courses", String(id));
  await deleteDoc(docRef);
  return true;
}


// Subida de foto de mentor /*
export async function uploadMentorPhoto(file, mentorId) {
  if (!file) return null;

  const { storage } = initFirebase();  // USAR EL MISMO STORAGE
  const fileRef = ref(storage, `mentors/${mentorId}_${file.name}`);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
}


/* ---------------------- BOOKINGS ---------------------- */
export async function getBookingsFirebase() {
  initFirebase();
  const snapshot = await getDocs(collection(db, "bookings"));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getBookingFirebase(id) {
  initFirebase();
  const docRef = doc(db, "bookings", String(id));
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Reserva no encontrada");
  return { id: snap.id, ...snap.data() };
}

export async function createBookingFirebase(data) {
  initFirebase();
  const col = collection(db, "bookings");
  const ref = await addDoc(col, data);
  return { id: ref.id, ...data };
}

export async function updateBookingFirebase(id, data) {
  initFirebase();
  const docRef = doc(db, "bookings", String(id));
  await updateDoc(docRef, data);
  return { id, ...data };
}

export async function deleteBookingFirebase(id) {
  initFirebase();
  const docRef = doc(db, "bookings", String(id));
  await deleteDoc(docRef);
  return true;
}

