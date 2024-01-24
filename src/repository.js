import { db } from "./firebase.js";
import { auth, createUserWithEmailAndPassword } from "./firebase.js";

export function signup(email, password, username) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // Create a user in your Firebase firestore
      db.collection("users")
        .doc(user.uid)
        .set({
          username: username,
          email: email,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Insert error handling here
    });
}

function login(email, password) {}

function logout() {}

function deleteUser() {}


