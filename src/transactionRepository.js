import { db } from "./firebase.js";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export async function addExpense(expense, userId) {
  if (!userId || !db) return;
  let year = new Date(expense.data).getFullYear();

  let docRef = doc(db, "users", userId, "transactions");
  expense.id = uuidv4();

  console.log("Adding expense: " + expense);

  let res = await setDoc(docRef, { [expense.id]: expense });

  console.log("Expense added: " + res);
}

export function deleteExpense(id, userId) {}

export function updateExpense(expense, userId) {}

export async function getTransactions(userId) {
  let transactions = [];
  let years = [];

  if (!userId || !db) return transactions;

  //   let docRef = doc(db, "users", userId);
  //   let querySnapshot = await getDoc(docRef);

  //   if (!querySnapshot.exists()) return transactions;

  //   querySnapshot.data().forEach((year) => {
  //     years.push(year);
  //   });

  //   for (let year of years) {
  //     let querySnapshot = await getDoc(doc(db, "users", userId, year));
  //     querySnapshot.forEach((doc) => {
  //       transactions.push(doc.data());
  //     });
  //   }

  console.log("Transactions: " + transactions);

  return transactions;
}

export function getExpense(id, userId) {}
