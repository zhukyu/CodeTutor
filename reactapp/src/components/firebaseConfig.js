import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyAi6gQY1oLmYfADHhEtEqGhkyq2GQIjd6E",
    authDomain: "code-tutor-b3c0b.firebaseapp.com",
    projectId: "code-tutor-b3c0b",
    storageBucket: "code-tutor-b3c0b.appspot.com",
    messagingSenderId: "668960819240",
    appId: "1:668960819240:web:16859c5709b07016fa4d1d"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;