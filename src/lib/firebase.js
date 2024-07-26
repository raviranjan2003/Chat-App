import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZYIudXs7N2C-mcUD94IEsq7QlpkxXbxw",
  authDomain: "chatapp-5b4aa.firebaseapp.com",
  projectId: "chatapp-5b4aa",
  storageBucket: "chatapp-5b4aa.appspot.com",
  messagingSenderId: "575629040971",
  appId: "1:575629040971:web:bd1a7284215eb781245cce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();