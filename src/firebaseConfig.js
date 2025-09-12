// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCFuYZT8wTgaNbTeuG_t1yVjl4cRE_J0As",
  authDomain: "ez-tech-889ea.firebaseapp.com", // 
  storageBucket: "ez-tech-889ea.appspot.com",
  messagingSenderId: "88727203470",
  appId: "1:88727203470:web:e9c7bab06acc3292fb63df",
  measurementId: "G-33N46DJD2BREME"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication instance + Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;