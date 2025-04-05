import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <motion.a
        href="https://wa.me/8248794519"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* My Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-[80px] top-1/2 transform -translate-y-1/2 bg-white text-green-600 px-3 py-2 rounded-lg shadow-md font-medium whitespace-nowrap"
          >
            Chat with us!
          </motion.div>
        )}

       
        <div className="relative">
          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 bg-green-500 rounded-full opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Main Button */}
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
            <FaWhatsapp className="text-white text-3xl" />
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
