import { db } from "./firebase.js";
import { auth, createUserWithEmailAndPassword } from "./firebase.js";

export async function signup(email, password, username) {
  let user_uid = null;

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      user_uid = user.uid;

      console.log("User signed up successfully");

      // Create a user in your Firebase firestore
      updateUserDatabase(user, username);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Insert error handling here
    });

  console.log("User UID: " + user_uid);
  return user_uid;
}

function login(email, password) {}

function logout() {}

function deleteUser() {}

function updateUserDatabase(user, username) {
  // Update user in Firebase firestore
  console.log("Updating user in Firebase firestore");

  db.collection("users")
    .doc(user.uid)
    .update({
      username: username,
      email: user.email,
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}
