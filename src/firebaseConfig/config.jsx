// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCF_8s5pp7UjWKIR2s1MYw5grivc7UvVY",
  authDomain: "todo-application-ed00f.firebaseapp.com",
  projectId: "todo-application-ed00f",
  storageBucket: "todo-application-ed00f.appspot.com",
  messagingSenderId: "207154799831",
  appId: "1:207154799831:web:493de8a17622aef72b3c92",
  measurementId: "G-9T67Q5RYG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleSignedIn = new GoogleAuthProvider();
export const firestore = getFirestore(app);