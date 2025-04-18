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
      setUser(firebaseUser ? { email: firebaseUser.email, uid: firebaseUser.uid, name: firebaseUser.displayName || "User" } : null);
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);