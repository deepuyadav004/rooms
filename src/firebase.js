// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeqoObo1i6IzRvBAPmV0mi_3_ocphJxzY",
  authDomain: "rooms-eb9b0.firebaseapp.com",
  projectId: "rooms-eb9b0",
  storageBucket: "rooms-eb9b0.appspot.com",
  messagingSenderId: "447015396555",
  appId: "1:447015396555:web:4471246e1af3c7ae54274e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()