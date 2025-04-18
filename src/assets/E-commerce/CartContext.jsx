import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Load user's cart and wishlist from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCart(userData.cart || []);
          setWishlist(userData.wishlist || []);
        } else {
          // Create new user document if it doesn't exist
          await setDoc(userDocRef, { cart: [], wishlist: [] });
          setCart([]);
          setWishlist([]);
        }
      } else {
        // User is signed out, clear local state
        setCart([]);
        setWishlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Helper function to update Firestore
  const updateFirestore = async (field, data) => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { [field]: data });
    }
  };

  // Cart Functions
  const addToCart = async (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let newCart;

      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateFirestore('cart', newCart);
      return newCart;
    });
  };

  const removeFromCart = async (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      updateFirestore('cart', newCart);
      return newCart;
    });
  };

  const decreaseQuantity = async (id) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      
      updateFirestore('cart', newCart);
      return newCart;
    });
  };

  const clearCart = async () => {
    setCart([]);
    if (currentUser) {
      await updateFirestore('cart', []);
    }
  };

  // Wishlist Functions
  const addToWishlist = async (product) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((item) => item.id === product.id);
      if (existingItem) {
        return prevWishlist;
      }
      const newWishlist = [...prevWishlist, { ...product }];
      updateFirestore('wishlist', newWishlist);
      return newWishlist;
    });
  };

  const removeFromWishlist = async (id) => {
    setWishlist((prevWishlist) => {
      const newWishlist = prevWishlist.filter((item) => item.id !== id);
      updateFirestore('wishlist', newWishlist);
      return newWishlist;
    });
  };

  const clearWishlist = async () => {
    setWishlist([]);
    if (currentUser) {
      await updateFirestore('wishlist', []);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        currentUser
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
