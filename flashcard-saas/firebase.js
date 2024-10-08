// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKMCFPVIrgC5218qIVo6SGJ7X44_JRp9E",
  authDomain: "ai-flashcard-saas-2.firebaseapp.com",
  projectId: "ai-flashcard-saas-2",
  storageBucket: "ai-flashcard-saas-2.appspot.com",
  messagingSenderId: "639433641724",
  appId: "1:639433641724:web:bd2ef1c3186959e7c85179",
  measurementId: "G-G5743YCSWL"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
