//import firebase from 'firebase';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgB2zGCTTXUxkn_C0te2i_cOG5QCW4NV4",
  authDomain: "react-streaming-service-app.firebaseapp.com",
  projectId: "react-streaming-service-app",
  storageBucket: "react-streaming-service-app.appspot.com",
  messagingSenderId: "989510590089",
  appId: "1:989510590089:web:327564e707ce5d4313b058",
  measurementId: "G-37LX3MNP9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Make auth and firestore references
const auth = getAuth();
const db = getFirestore();

//Sign in with Email and Password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
 //Register with Email and Password
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//Reset password
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//Logout
const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};