import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";

const AuthContext = createContext();

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom profile data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const customData = userDoc.exists() ? userDoc.data() : {};
        setUser({
          ...firebaseUser,
          name: firebaseUser.displayName || customData.name || firebaseUser.email.split("@")[0],
          profilePic: firebaseUser.photoURL || customData.profilePic || null,
          phone: customData.phone || "",
          address: customData.address || "",
          updatedAt: customData.updatedAt || new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
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

  const updateUserProfile = async (updatedData) => {
    if (!user) throw new Error("No user logged in");

    try {
      // Update Firebase Authentication profile (name, profilePic)
      await updateProfile(auth.currentUser, {
        displayName: updatedData.name,
        photoURL: updatedData.profilePic,
      });

      // Update custom fields in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: updatedData.name,
        profilePic: updatedData.profilePic,
        phone: updatedData.phone,
        address: updatedData.address,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      // Update local state with the latest data
      const updatedUser = {
        ...user,
        displayName: updatedData.name,
        photoURL: updatedData.profilePic,
        phone: updatedData.phone,
        address: updatedData.address,
        updatedAt: new Date().toISOString(),
      };
      setUser(updatedUser);
    } catch (error) {
      throw new Error("Failed to update profile: " + error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUserProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
