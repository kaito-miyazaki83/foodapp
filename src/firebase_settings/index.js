// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhCcYW5NEwD5IOJ39Tm6zjsPAVgFq8cbY",
  authDomain: "foodapp-2291b.firebaseapp.com",
  databaseURL: "https://foodapp-2291b-default-rtdb.firebaseio.com",
  projectId: "foodapp-2291b",
  storageBucket: "foodapp-2291b.firebasestorage.app",
  messagingSenderId: "355169340440",
  appId: "1:355169340440:web:4e79966f12134d2eb2476d",
  measurementId: "G-RMXTMNMM3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

export default { analytics, db, auth }