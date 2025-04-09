import { motion, AnimatePresence } from "framer-motion";
import { Favorite, Delete, ShoppingCart } from "@mui/icons-material";
import { FaRupeeSign, FaHeartBroken } from "react-icons/fa";
import { useCart } from "./CartContext";
import { Button, IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  };

  const handleRemoveFromWishlist = (itemId, itemName) => {
    removeFromWishlist(itemId);
    toast.info(`${itemName} removed from wishlist`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Favorite className="text-red-500 mr-3" fontSize="large" />
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            {wishlist.length > 0 && (
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-200">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center max-w-lg mx-auto"
          >
            <FaHeartBroken className="text-6xl text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Your Wishlist is Empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add items you love by clicking the heart icon while shopping.
            </p>
            <Button
              variant="contained"
              size="large"
              href="/shop"
              sx={{
                backgroundColor: '#3b82f6',
                '&:hover': { backgroundColor: '#2563eb' },
                borderRadius: '9999px',
                padding: '10px 24px',
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              Explore Products
            </Button>
          </motion.div>
        ) : (
          /* Wishlist Items */
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <IconButton
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                      }}
                    >
                      <Delete fontSize="small" className="text-red-500" />
                    </IconButton>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 capitalize">
                      {item.category}
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <FaRupeeSign className="text-gray-700 mr-1" />
                      <span className="text-xl font-bold text-gray-900">
                        {item.price.toLocaleString()}
                      </span>
                    </div>

                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(item)}
                      sx={{
                        borderRadius: '8px',
                        padding: '8px 16px',
                        textTransform: 'none',
                        fontWeight: 'medium',
                        '&:hover': {
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          borderColor: '#3b82f6'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Wishlist; 