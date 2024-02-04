import { db } from "./firebase.js";
import { getDoc, setDoc, doc } from "firebase/firestore";
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

export function deleteExpense(id, userId) {}

export function updateExpense(expense, userId) {}

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

export function getExpense(id, userId) {}
