import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDc4L6eEgyb8ONARO8KnQRrA1YGdJWsTYU",
    authDomain: "ecoturismo-e4d83.firebaseapp.com",
    projectId: "ecoturismo-e4d83",
    storageBucket: "ecoturismo-e4d83.appspot.com",
    messagingSenderId: "122169532728",
    appId: "1:122169532728:web:3339ad26fd77de087761cd"
};

export const firebaseapp = firebase.initializeApp(firebaseConfig);