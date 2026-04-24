import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEr4F55lionuIdBPckzjBEjvc5uYGPyS4",
  authDomain: "vuelve-a-ti.firebaseapp.com",
  projectId: "vuelve-a-ti",
  storageBucket: "vuelve-a-ti.firebasestorage.app",
  messagingSenderId: "927807457411",
  appId: "1:927807457411:web:58a4bcaba9c03ecaa273b6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
