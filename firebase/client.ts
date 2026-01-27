// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOo6BJT9LzUC7mGAUqXWN6MT9d-c1XJ_c",
    authDomain: "mockmate-122cb.firebaseapp.com",
    projectId: "mockmate-122cb",
    storageBucket: "mockmate-122cb.firebasestorage.app",
    messagingSenderId: "390744055939",
    appId: "1:390744055939:web:985512398c4176b2433bb6",
    measurementId: "G-NV86VX4L42"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);