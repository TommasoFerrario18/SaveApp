import db from "./firebase.js";
import { getDoc, setDoc, doc } from "firebase/firestore";
import {v4 as uuidv4} from 'uuid';

export function addExpense(expense, userId) {
    let date = new Date(expense.date);
    let year = date.getFullYear();

    setDoc(doc(db, "users", userId, year, uuidv4()), expense);
}

export function deleteExpense(id, userId) {

}

export function updateExpense(expense, userId) {

}

export async function getTransactions(userId) {
    let transactions = [];
    let years = [];

    let querySnapshot = await getDoc(doc(db, "users", userId));

    querySnapshot.forEach((doc) => {
        years.push(doc.id);
    });

    for (let year of years) {
        let querySnapshot = await db.collection("users").doc(userId).collection(year).get();
        querySnapshot.forEach((doc) => {
            transactions.push(doc.data());
        });
    }

    return transactions;
}

export function getExpense(id, userId) {

}

