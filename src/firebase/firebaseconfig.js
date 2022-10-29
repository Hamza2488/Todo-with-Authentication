// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNL9hWi69hF1HtDU3sTy4z_jgcqB84zsw",
  authDomain: "react-todo-3d686.firebaseapp.com",
  projectId: "react-todo-3d686",
  storageBucket: "react-todo-3d686.appspot.com",
  messagingSenderId: "17208142861",
  appId: "1:17208142861:web:d4c5b8b7aba185c3cc3944",
  measurementId: "G-L3W5NMB4WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app