import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARmzYIF-m7e0fquZrlC1nUK6n_cduOxoo",
  authDomain: "alm-saas.firebaseapp.com",
  projectId: "alm-saas",
  storageBucket: "alm-saas.firebasestorage.app",
  messagingSenderId: "56285561739",
  appId: "1:56285561739:web:db4ee908220fbc93afe58e",
  measurementId: "G-99EP62K726",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

