/**
 * Servicio de Usuarios - Usa Firebase Firestore
 */

import {
  getUsersFirebase,
  getUserFirebase,
  createUserFirebase,
  updateUserFirebase,
  deleteUserFirebase
} from "./firebaseService";

/**
 * GET /api/users - Obtener todos los usuarios
 */
export async function getAllUsers() {
  try {
    return await getUsersFirebase();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

/**
 * GET /api/users/:id - Obtener un usuario por ID
 */
export async function getUserById(id) {
  if (!id) throw new Error("User ID is required");
  try {
    return await getUserFirebase(id);
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
}

/**
 * POST /api/users - Crear un nuevo usuario
 */
export async function createUser(data) {
  if (!data) throw new Error("User data is required");
  try {
    return await createUserFirebase(data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * PUT /api/users/:id - Actualizar un usuario
 */
export async function updateUser(id, data) {
  if (!id) throw new Error("User ID is required");
  if (!data) throw new Error("User data is required");
  try {
    return await updateUserFirebase(id, data);
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
}

/**
 * DELETE /api/users/:id - Eliminar un usuario
 */
export async function deleteUser(id) {
  if (!id) throw new Error("User ID is required");
  try {
    return await deleteUserFirebase(id);
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
