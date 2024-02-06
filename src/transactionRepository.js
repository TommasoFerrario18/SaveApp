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

export async function addExpense(expense, userId) {
  if (!userId || !db) return false;

  let year = new Date(expense.data).getFullYear();

  expense.id = uuidv4();

  await setDoc(doc(db, "users", userId, "transactions", year.toString()), {
    [expense.id]: expense,
  });

  return true;
}

export async function deleteExpense(id, year, userId) {
  if (!userId || !db) return false;

  let doc = await updateDoc(
    doc(db, "users", userId, "transactions", year.toString()),
    {
      [id]: deleteField(),
    }
  );

  return doc.exists();
}

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

export function getExpense(id, userId) { }
