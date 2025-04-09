import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Chip } from "@mui/material";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + tax;

  // Animation variants
  const cartItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.2 }
    }
  };

  const handleRemoveAll = () => {
    clearCart();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <FiShoppingCart className="text-3xl text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h2>
          <Chip 
            label={`${cart.length} items`} 
            color="primary" 
            className="ml-4" 
            size="small"
          />
        </div>
        {cart.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveAll}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <FiTrash2 className="mr-2" />
            Remove All
          </motion.button>
        )}
      </div>

      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-5xl mb-4 text-gray-300">
            <FiShoppingCart />
          </div>
          <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center mx-auto"
          >
            Continue Shopping
            <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
      ) : (
        <div>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                variants={cartItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4"
              >
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md border border-gray-200" 
                  />

                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-blue-600 font-medium">₹{item.price.toLocaleString()}</p>

                    <div className="flex items-center mt-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        className={`p-2 rounded-md ${
                          item.quantity === 1 
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <FiMinus />
                      </motion.button>
                      <span className="mx-3 w-8 text-center font-medium">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(item)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                      >
                        <FiPlus />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                >
                  <FiTrash2 />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-medium text-gray-700">Subtotal:</span>
              <span className="text-xl font-bold text-blue-600">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-medium text-gray-700">Tax (18%):</span>
              <span className="text-xl font-bold text-orange-500">₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-gray-700">Shipping:</span>
              <span className="text-xl font-bold text-green-600">FREE</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-purple-600">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/checkoutform")}
              className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-lg font-semibold hover:shadow-lg transition-all"
            >
              Proceed to Checkout
              <FaArrowRight className="inline ml-2" />
            </motion.button>

            <button
              onClick={() => navigate("/shop")}
              className="mt-4 w-full py-2 text-blue-600 rounded-lg text-md font-medium hover:bg-blue-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
