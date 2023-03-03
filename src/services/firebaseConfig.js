import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV2sBDsTSzbq46YHhRsf9nElcFs2kTw84",
  authDomain: "react-auth-1d2b3.firebaseapp.com",
  projectId: "react-auth-1d2b3",
  storageBucket: "react-auth-1d2b3.appspot.com",
  messagingSenderId: "827258762285",
  appId: "1:827258762285:web:949cc4189bd4a78ea474a4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
