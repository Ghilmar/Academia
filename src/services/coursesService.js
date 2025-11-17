import { 
  getCoursesFirebase,
  getCourseFirebase,
  createCourseFirebase,
  updateCourseFirebase,
  deleteCourseFirebase
} from './firebaseService';

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
