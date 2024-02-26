import { db } from "./firebase.js";
import {
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  doc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

/**
 * Adds an expense to the user's transactions.
 * @param {Object} expense - The expense object to be added.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the expense
 * is added successfully, false otherwise.
 */
export async function addExpense(expense, userId) {
  if (!userId || !db) return false;

  let year = new Date(expense.data).getFullYear();

  expense.id = uuidv4();

  await setDoc(doc(db, "users", userId, "transactions", year.toString()), {
    [expense.id]: expense,
  });

  return true;
}

/**
 * Deletes an expense from the user's transactions.
 * @param {string} id - The ID of the expense to be deleted.
 * @param {string|number} year - The year of the expense.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the expense
 * is deleted successfully, false otherwise.
 */
export async function deleteExpense(id, year, userId) {
  if (!userId || !db) return false;

  if (typeof year !== "string") year = year.toString();

  let res = await updateDoc(doc(db, "users", userId, "transactions", year), {
    [id]: deleteField(),
  });

  return res;
}

/**
 * Updates an expense in the user's transactions.
 * @param {Object} expense - The updated expense object.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the expense
 * is updated successfully, false otherwise.
 */
export async function updateExpense(expense, userId) {
  if (!userId || !db) return false;

  let year = new Date(expense.data).getFullYear();

  let res = await updateDoc(
    doc(db, "users", userId, "transactions", year.toString()),
    {
      [expense.id]: expense,
    }
  );

  return res.exists();
}

/**
 * Retrieves the user's transactions.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of transactions.
 */
export async function getTransactions(userId) {
  if (!userId || !db) return [];

  let querySnapshot = await getDoc(
    doc(
      db,
      "users",
      userId,
      "transactions",
      new Date().getFullYear().toString()
    )
  );

  if (!querySnapshot.exists()) return [];

  return querySnapshot.data();
}

/**
 * Retrieves an expense from the user's transactions.
 * @param {string} id - The ID of the expense to be retrieved.
 * @param {string} userId - The ID of the user.
 */
export function getExpense(id, userId) {}
