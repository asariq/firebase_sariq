// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4ebID7T6UA2AfycWxsdoc1T0jdl54eEw",
  authDomain: "fir-sample-d33e3.firebaseapp.com",
  projectId: "fir-sample-d33e3",
  storageBucket: "fir-sample-d33e3.appspot.com",
  messagingSenderId: "1011574053560",
  appId: "1:1011574053560:web:78e1321ed7ea43b585324d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = getFirestore(app);