// src/lib/firebase.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYzSBj4L90SJ2F10cJfmAGKIBXCrCjwso",
  authDomain: "aurelia-bfca7.firebaseapp.com",
  projectId: "aurelia-bfca7",
  storageBucket: "aurelia-bfca7.firebasestorage.app",
  messagingSenderId: "1095806008259",
  appId: "1:1095806008259:web:22eaeeff9adf4ed2a75b76"
};

// Initialize Firebase safely for Next.js hot-reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize and export Authentication
export const auth = getAuth(app);
export default app;