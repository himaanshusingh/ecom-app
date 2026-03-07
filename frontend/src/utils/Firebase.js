import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "logincocart.firebaseapp.com",
  projectId: "logincocart",
  storageBucket: "logincocart.firebasestorage.app",
  messagingSenderId: "497536791887",
  appId: "1:497536791887:web:d6325e92610f687527c13a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}