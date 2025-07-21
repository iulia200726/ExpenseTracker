import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCV8nf09iiy2iwaMLJPCORy_6tCNfL2-zs",
  authDomain: "expensetracker-e16ef.firebaseapp.com",
  projectId: "expensetracker-e16ef",
  storageBucket: "expensetracker-e16ef.firebasestorage.app",
  messagingSenderId: "236220145098",
  appId: "1:236220145098:web:60c3bd926cb01c50ff0333",
  measurementId: "G-LD3RRGSN8E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, firebaseConfig };