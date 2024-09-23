// Import the specific services from Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyASGQZT7337efaRgabByAdnVvoEkgy5CpM",
    authDomain: "linkedin-clone-dfd40.firebaseapp.com",
    projectId: "linkedin-clone-dfd40",
    storageBucket: "linkedin-clone-dfd40.appspot.com",
    messagingSenderId: "1080326189440",
    appId: "1:1080326189440:web:9de4c2a5bb9b260610d165",
    measurementId: "G-8XM5CJFHGH",
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

// Export the services you need
export { auth, provider, storage, signInWithPopup };
export default db;
