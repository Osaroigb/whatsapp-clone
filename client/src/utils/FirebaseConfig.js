import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpdlXXCz_Ne5wo15FNeN8cHJRn_X5H_mU",
  authDomain: "whatsapp-clone-5bc3a.firebaseapp.com",
  projectId: "whatsapp-clone-5bc3a",
  storageBucket: "whatsapp-clone-5bc3a.appspot.com",
  messagingSenderId: "444646190479",
  appId: "1:444646190479:web:ce4cbe5a06793d23692ffa",
  measurementId: "G-B7FG96C5C4"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
