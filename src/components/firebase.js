// firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBcoyI-35jCBD4HvKmOJTp0IWNUhsKmMzQ",
  authDomain: "myfirstproject-178f5.firebaseapp.com",
  projectId: "myfirstproject-178f5",
  storageBucket: "myfirstproject-178f5.appspot.com",
  messagingSenderId: "384664206421",
  appId: "1:384664206421:web:eb9d8ac710a62e0b2c68dc",
  measurementId: "G-XDPWET92Z5"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
