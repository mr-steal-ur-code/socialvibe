import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUiTs5IruMbkjb4UOSpKtsYre-_kiV89A",
  authDomain: "socialvibe-4abd3.firebaseapp.com",
  projectId: "socialvibe-4abd3",
  storageBucket: "socialvibe-4abd3.firebasestorage.app",
  messagingSenderId: "994467537647",
  appId: "1:994467537647:web:e44c9e45dd8abb7371b11a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }