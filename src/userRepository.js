/**
 * @file Manages user authentication and user data in the application.
 * @module userRepository
 */

import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

/**
 * Signs up a user with the provided email, password, and username.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} username - The username of the user.
 * @returns {Promise<string>} - A promise that resolves to the user UID.
 */
export async function signup(email, password, username) {
  let user_uid = null;

  let user = null;

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user;

      user_uid = user.uid;
      createUser(user.uid, username, email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Insert error handling here
    });

  return user_uid;
}

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} - A promise that resolves to the user UID.
 */
export async function login(email, password) {
  let user_uid = null;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user_uid = userCredential.user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Insert error handling here
    });

  return user_uid;
}

/**
 * Logs out the currently authenticated user.
 *
 * @returns {Promise<string|Error>} - A promise that resolves to a success message or an error.
 */
export async function logout() {
  await signOut(auth)
    .then(() => {
      return "User signed out successfully";
    })
    .catch((error) => {
      return error;
    });
}

/**
 * Deletes a user from the database.
 *
 * @param {string} userId - The ID of the user to delete.
 */
export function deleteUser(userId) {
  deleteDoc(doc(db, "users", userId));
}

/**
 * Creates a new user document in the database.
 *
 * @param {string} id - The ID of the user.
 * @param {string} name - The username of the user.
 * @param {string} email - The email of the user.
 */
async function createUser(id, name, email) {
  setDoc(doc(db, "users", id), {
    username: name,
    email: email,
  });
}
