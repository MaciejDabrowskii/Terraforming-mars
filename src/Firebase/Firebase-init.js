/* eslint-disable import/prefer-default-export */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKhZNHVQ93LEVq7ZWrUBP3BEAu3yK11Kg",
  authDomain: "terraforming-mars-3360a.firebaseapp.com",
  projectId: "terraforming-mars-3360a",
  storageBucket: "terraforming-mars-3360a.appspot.com",
  messagingSenderId: "214544599289",
  appId: "1:214544599289:web:548a0a20115f1f68ccfa28",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
// appId: process.env.REACT_APP_FIREBASE_APP_ID,
