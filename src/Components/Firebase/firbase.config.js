// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBKWKL8I-TsCF5qshsRbOOWBi6bdwX-ovs",
  authDomain: "shaadidotcom-f3698.firebaseapp.com",
  projectId: "shaadidotcom-f3698",
  storageBucket: "shaadidotcom-f3698.appspot.com",
  messagingSenderId: "882678815592",
  appId: "1:882678815592:web:1b6200c43a0030fd1654dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);