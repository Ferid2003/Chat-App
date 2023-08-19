import { getFirestore,collection } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC2Y_Ryld4JM1c6-AEYLz1NCzBdlXQrlno",
    authDomain: "chatapp-e1542.firebaseapp.com",
    projectId: "chatapp-e1542",
    storageBucket: "chatapp-e1542.appspot.com",
    messagingSenderId: "335727106713",
    appId: "1:335727106713:web:f9349f7c5b47fc6ca2f608",
    measurementId: "G-7L0LKZLKR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db =  getFirestore(app)
export const usersCollection = collection(db, "users")
export const messagesCollection = collection(db, "messages")
export const auth = getAuth(app);
export const storage = getStorage(app);

