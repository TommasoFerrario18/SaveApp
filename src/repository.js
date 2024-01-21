import { db } from "./firebase.js";
import {auth, createUserWithEmailAndPassword} from "./firebase.js";

export function signup(email, password, username) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user", user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);
      // ..
    });
}
