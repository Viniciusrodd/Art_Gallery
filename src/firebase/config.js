
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNNjK292KIxT__iCMXXBmRyddXzwv6gfg",
    authDomain: "miniblog-f18ba.firebaseapp.com",
    projectId: "miniblog-f18ba",
    storageBucket: "miniblog-f18ba.firebasestorage.app",
    messagingSenderId: "767633795255",
    appId: "1:767633795255:web:aecb8643c5b64467090532"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // for import with keys, like: ( import { db } from '...' )
