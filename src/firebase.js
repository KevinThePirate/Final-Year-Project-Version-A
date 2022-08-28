import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaK9bOf_6uggBHcVmu5yqbmAm5yE-tTxk",
  authDomain: "cal-tool-alpha.firebaseapp.com",
  projectId: "cal-tool-alpha",
  storageBucket: "cal-tool-alpha.appspot.com",
  messagingSenderId: "506852190093",
  appId: "1:506852190093:web:52fdd8d10931820337ffc4",
  measurementId: "G-0KT2E0DWRC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authentication = getAuth(app);
export { db, authentication };
