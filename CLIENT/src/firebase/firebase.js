import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-7KPIjH9NVJ6QgZGvZZZc25xR7k5DWuY",
  authDomain: "fir-c2b25.firebaseapp.com",
  projectId: "fir-c2b25",
  storageBucket: "fir-c2b25.appspot.com",
  messagingSenderId: "923060115219",
  appId: "1:923060115219:web:c958ccb2a56b8d2a9dace6",
  measurementId: "G-BSREJGZQEM"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
