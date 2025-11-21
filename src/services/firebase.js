// src/services/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfUfmWgl5Ji0izpz0bq8kmphGXQv8Jzpc",
  authDomain: "academia-a52b0.firebaseapp.com",
  projectId: "academia-a52b0",
  storageBucket: "academia-a52b0.appspot.com",
  messagingSenderId: "285423680506",
  appId: "1:285423680506:web:5ac9ff5c1cbc1d49304243",
  measurementId: "G-HNJCC2PJQY"
};

let app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
