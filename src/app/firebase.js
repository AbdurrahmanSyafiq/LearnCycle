// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getApp } from "firebase/app";
import { getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSvJc4Dg-OFisiALaDGx8YtRzmdbKqmRU",
  authDomain: "projek-rpl.firebaseapp.com",
  projectId: "projek-rpl",
  storageBucket: "projek-rpl.appspot.com",
  messagingSenderId: "400540537351",
  appId: "1:400540537351:web:90a0218e39c6d8d77a50a2",
  measurementId: "G-DTBNFEJT56",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
