import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1OwLnfmXcSSSoVzIl8pyAeEBcPURP7zU",
  authDomain: "house-marketplace-app-4eb10.firebaseapp.com",
  projectId: "house-marketplace-app-4eb10",
  storageBucket: "house-marketplace-app-4eb10.appspot.com",
  messagingSenderId: "274982918814",
  appId: "1:274982918814:web:bee68498735f39eb87f98f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()