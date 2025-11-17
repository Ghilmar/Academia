// bookingService.js
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function createBooking(booking) {
  try {
    const docRef = await addDoc(collection(db, "bookings"), booking);
    return { id: docRef.id, ...booking };
  } catch (error) {
    console.error("Error creando reserva:", error);
    throw new Error("No se pudo crear la reserva en Firebase");
  }
}
