import {  getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8-RA37YyHhDsVhbGn1mp1xBrI7N0D4U8",
    authDomain: "cu-monitoring-d0c7c.firebaseapp.com",
    projectId: "cu-monitoring-d0c7c",
    storageBucket: "cu-monitoring-d0c7c.appspot.com",
    messagingSenderId: "671304905280",
    appId: "1:671304905280:web:d29d739e5907de0b35a5a5",
    measurementId: "G-ZLJLCCCBFR"
  
};

const app = initializeApp(firebaseConfig);

getApps().length === 0 ? initializeApp(firebaseConfig) : app;

const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };

