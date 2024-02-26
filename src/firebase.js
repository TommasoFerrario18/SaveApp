/**
 * Initializes the Firebase app and returns the app instance.
 * @returns {import("firebase/app").FirebaseApp} The initialized Firebase app instance.
 */
import { initializeApp } from "firebase/app";

/**
 * Returns the authentication service for the Firebase app.
 * @param {import("firebase/app").FirebaseApp} app - The Firebase app instance.
 * @returns {import("firebase/auth").Auth} The authentication service.
 */
import { getAuth } from "firebase/auth";

/**
 * Returns the Firestore database service for the Firebase app.
 * @param {import("firebase/app").FirebaseApp} app - The Firebase app instance.
 * @returns {import("firebase/firestore").Firestore} The Firestore database service.
 */
import { getFirestore } from "firebase/firestore";

import {} from "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

/**
 * The initialized Firebase app instance.
 * @type {import("firebase/app").FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * The Firestore database service for the Firebase app.
 * @type {import("firebase/firestore").Firestore}
 */
const db = getFirestore(app);

/**
 * The authentication service for the Firebase app.
 * @type {import("firebase/auth").Auth}
 */
const auth = getAuth(app);

export default app;
export { db };
export { auth };
