import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { FaCheckCircle, FaShoppingBag, FaHome } from "react-icons/fa";
import { FiTruck, FiMail } from "react-icons/fi";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId } = location.state || {}; // Get orderId from state

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 text-center">
          <motion.div variants={itemVariants}>
            <FaCheckCircle className="text-5xl text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Order Confirmed!</h2>
          </motion.div>
        </div>

        <div className="p-8">
          <motion.div variants={itemVariants} className="text-center mb-6">
            <p className="text-lg text-gray-700 mb-4">
              Thank you for your purchase! Your order has been placed successfully.
            </p>

            <div className="flex flex-col space-y-4 text-left bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <FiMail className="text-blue-500 mr-3 text-xl" />
                <span>Confirmation email sent to your registered address</span>
              </div>
              <div className="flex items-center">
                <FiTruck className="text-blue-500 mr-3 text-xl" />
                <span>Your order will be shipped within 2 business days</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              Order ID: #{orderId || Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <FaHome />
                Back to Home
              </motion.button>
            </Link>
            <Link to="/shop" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-purple-500 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <FaShoppingBag />
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center">
          <motion.p variants={itemVariants} className="text-gray-500 text-sm">
            Need help? <Link to="/contact" className="text-blue-500 hover:underline">Contact our support</Link>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmation;
