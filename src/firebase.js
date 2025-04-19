import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMfnb5_2h98MA3FYFyWe2BD3wSKd1pmD0",
  authDomain: "megamart-b0545.firebaseapp.com",
  projectId: "megamart-b0545",
  storageBucket: "megamart-b0545.appspot.com",
  messagingSenderId: "226342898198",
  appId: "1:226342898198:web:601a25cbfbb1c24a004337",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
