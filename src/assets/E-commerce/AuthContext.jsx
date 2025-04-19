import React, { createContext, useContext, useState, useEffect } from "react";
// Firebase
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? { 
        email: firebaseUser.email, 
        uid: firebaseUser.uid, 
        name: firebaseUser.displayName || "User",
        profilePic: firebaseUser.photoURL || null
      } : null);
    });
    return unsubscribe;
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error("Logout failed:", error.message);
    });
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
