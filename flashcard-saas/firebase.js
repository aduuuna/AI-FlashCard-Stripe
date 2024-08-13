// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5IzBKX2KSQkOZG63YPez2lf8GtX7GkLM",
  authDomain: "ai-flashcards-and-stripe.firebaseapp.com",
  projectId: "ai-flashcards-and-stripe",
  storageBucket: "ai-flashcards-and-stripe.appspot.com",
  messagingSenderId: "1068855556180",
  appId: "1:1068855556180:web:b60f3e776233d54139d5c1",
  measurementId: "G-ENFFD1XECW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
