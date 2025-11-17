/**
 * Servicio de Mentores - Usa Firebase Firestore
 */

import {
  getMentorsFirebase,
  getMentorFirebase,
  createMentorFirebase,
  updateMentorFirebase,
  deleteMentorFirebase
} from "./firebaseService";

/**
 * GET /api/mentors
 * Obtiene todos los mentores
 */
export async function getAllMentors() {
  try {
    return await getMentorsFirebase();
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
}

/**
 * GET /api/mentors/:id
 * Obtiene un mentor específico por ID
 */
export async function getMentorById(id) {
  if (!id) throw new Error("Mentor ID is required");
  try {
    return await getMentorFirebase(id);
  } catch (error) {
    console.error(`Error fetching mentor ${id}:`, error);
    throw error;
  }
}

/**
 * POST /api/mentors
 * Crea un nuevo mentor
 */
export async function createMentor(data) {
  if (!data) throw new Error("Mentor data is required");
  try {
    return await createMentorFirebase(data);
  } catch (error) {
    console.error("Error creating mentor:", error);
    throw error;
  }
}

/**
 * PUT /api/mentors/:id
 * Actualiza un mentor existente
 */
export async function updateMentor(id, data) {
  if (!id) throw new Error("Mentor ID is required");
  if (!data) throw new Error("Mentor data is required");
  try {
    return await updateMentorFirebase(id, data);
  } catch (error) {
    console.error(`Error updating mentor ${id}:`, error);
    throw error;
  }
}

/**
 * DELETE /api/mentors/:id
 * Elimina un mentor
 */
export async function deleteMentor(id) {
  if (!id) throw new Error("Mentor ID is required");
  try {
    return await deleteMentorFirebase(id);
  } catch (error) {
    console.error(`Error deleting mentor ${id}:`, error);
    throw error;
  }
}

export default {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor
};
