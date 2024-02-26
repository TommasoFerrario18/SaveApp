import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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

export function logout() {
  signOut(auth)
    .then(() => {
      return "User signed out successfully";
    })
    .catch((error) => {
      return error;
    });
}

export function deleteUser(userId) {
  deleteDoc(doc(db, "users", userId));
}

async function createUser(id, name, email) {
  setDoc(doc(db, "users", id), {
    username: name,
    email: email,
  });
}
