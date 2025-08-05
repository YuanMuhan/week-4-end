// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx854QJbvY1MDbrbvhNbvF0cDO5uwj2SU",
  authDomain: "yuan-muhan-lab7.firebaseapp.com",
  projectId: "yuan-muhan-lab7",
  storageBucket: "yuan-muhan-lab7.firebasestorage.app",
  messagingSenderId: "661997501816",
  appId: "1:661997501816:web:9559319e12fe65a0431c8d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db