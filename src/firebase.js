// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZYhTYOL0iBmueYBPL_JrMxJZ5oZCV9_Y",
  authDomain: "ielts7-48b25.firebaseapp.com",
  databaseURL: "https://ielts7-48b25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ielts7-48b25",
  storageBucket: "ielts7-48b25.firebasestorage.app",
  messagingSenderId: "473076954049",
  appId: "1:473076954049:web:086f7fa5af71a045c57540",
  measurementId: "G-9C0BGHDPFG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };