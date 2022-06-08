// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_6sdu_i5eJwkDzoj2oinD9lJrZ36b_vc",
  authDomain: "photo-real-5c588.firebaseapp.com",
  projectId: "photo-real-5c588",
  storageBucket: "photo-real-5c588.appspot.com",
  messagingSenderId: "976435333987",
  appId: "1:976435333987:web:8dc3d5b603644720166156",
  measurementId: "G-J42ED5RZ8R"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const appStorage = getStorage(firebaseApp)
const appFirestore = getFirestore(firebaseApp)

export { appStorage, appFirestore }