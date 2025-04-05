import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImage from './Hero.jpg';
import { FiArrowRight } from "react-icons/fi";

const HeroSection = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HeroImage}
          alt="Fashion Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
      </div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          variants={itemVariants}
        >
          Elevate Your Style
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Discover premium fashion at unbeatable prices
        </motion.p>

        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate("/shop")}
            className="group relative px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center">
              Shop Collection
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </motion.div>

      
        <motion.div
          className="mt-8 text-white/80 text-sm"
          variants={itemVariants}
        >
          Free shipping on orders over ₹5000
        </motion.div>
      </motion.div>

      {/* Scrolling Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{
              y: [0, 8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
