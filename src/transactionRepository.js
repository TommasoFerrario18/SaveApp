import db from "./firebase.js";
import { setDoc, doc } from "firebase/firestore";
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

export function getExpenses(userId) {

}

export function getExpense(id, userId) {

}

