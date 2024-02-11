import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCREBSSKXOoY0pNvMnCZrE60_yexwJR_jA",
  authDomain: "leetcode-c2739.firebaseapp.com",
  projectId: "leetcode-c2739",
  storageBucket: "leetcode-c2739.appspot.com",
  messagingSenderId: "957127779647",
  appId: "1:957127779647:web:93d649089fceb05ae19f8a",
  measurementId: "G-QXK6VDR6J3",
};


const app = !getApp.length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };
