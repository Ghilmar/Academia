// Capa API principal (Firebase Firestore -> Firebase Services)
// Consumimos los servicios desde firebaseService.js
// Endpoints: /api/mentors, /api/courses, etc. ahora usan Firebase

import { 
  getMentorsFirebase, 
  getMentorFirebase, 
  createMentorFirebase, 
  updateMentorFirebase, 
  deleteMentorFirebase, 
  
  getUsersFirebase, 
  getUserFirebase, 
  createUserFirebase, 
  updateUserFirebase, 
  deleteUserFirebase,
  
  getCoursesFirebase,
  getCourseFirebase,
  createCourseFirebase,
  updateCourseFirebase,
  deleteCourseFirebase,
  
  createBookingFirebase,
  getBookingsFirebase,
  getBookingFirebase,
  updateBookingFirebase,
  deleteBookingFirebase
  
} from '../services/firebaseService';

/* ---------------------- MENTORS ---------------------- */
export async function getMentors(query = "") {
  return await getMentorsFirebase();
}

export async function getMentor(id) {
  return await getMentorFirebase(id);
}

export async function createMentor(data) {
  return await createMentorFirebase(data);
}

export async function updateMentor(id, data) {
  return await updateMentorFirebase(id, data);
}

export async function deleteMentor(id) {
  return await deleteMentorFirebase(id);
}

/* ---------------------- USERS ---------------------- */
export async function getUsers(query = "") {
  return await getUsersFirebase();
}

export async function getUser(id) {
  return await getUserFirebase(id);
}

export async function createUser(data) {
  return await createUserFirebase(data);
}

export async function updateUser(id, data) {
  return await updateUserFirebase(id, data);
}

export async function deleteUser(id) {
  return await deleteUserFirebase(id);
}

/* ---------------------- COURSES ---------------------- */
export async function getCourses(query = "") {
  return await getCoursesFirebase();
}

export async function getCourse(id) {
  return await getCourseFirebase(id);
}

export async function createCourse(data) {
  return await createCourseFirebase(data);
}

export async function updateCourse(id, data) {
  return await updateCourseFirebase(id, data);
}

export async function deleteCourse(id) {
  return await deleteCourseFirebase(id);
}


/* ---------------------- BOOKINGS ---------------------- */

export async function getBookings(query = "") {
  return await getBookingsFirebase();
}

export async function getBooking(id) {
  return await getBookingFirebase(id);
}

export async function createBooking(data) {
  return await createBookingFirebase(data);
}

export async function updateBooking(id, data) {
  return await updateBookingFirebase(id, data);
}

export async function deleteBooking(id) {
  return await deleteBookingFirebase(id);
}