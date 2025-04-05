import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  GiClothes, 
  GiRunningShoe, 
  GiNecklace,
  GiBigDiamondRing
} from "react-icons/gi";
import { IoShirtSharp } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";


import MenBg from "./Men.jpg";
import WomenBg from "./Women.jpg";
import AccessoriesBg from "./Accessories.jpg";
import FootwearBg from "./Shoes.jpg";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      name: "Men's Fashion", 
      icon: <IoShirtSharp className="text-4xl text-white" />,
      path: "/men",
      bgImage: MenBg,
      overlay: "bg-blue-600/70"
    },
    { 
      name: "Women's Fashion", 
      icon: <GiClothes className="text-4xl text-white" />,
      path: "/women",
      bgImage: WomenBg,
      overlay: "bg-pink-600/70"
    },
    { 
      name: "Accessories", 
      icon: <GiBigDiamondRing className="text-4xl text-white" />,
      path: "/accessories",
      bgImage: AccessoriesBg,
      overlay: "bg-purple-600/70"
    },
    { 
      name: "Footwear", 
      icon: <GiRunningShoe className="text-4xl text-white" />,
      path: "/footwear",
      bgImage: FootwearBg,
      overlay: "bg-amber-600/70"
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Browse Collections
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl shadow-lg group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(category.path)}
            >
             
              <motion.img
                src={category.bgImage}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              
         
              <div className={`absolute inset-0 ${category.overlay} transition-opacity duration-300`} />
              
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-full shadow-lg">
                  {category.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                
                <motion.div
                  className="flex items-center mt-4 px-6 py-2 bg-white text-gray-800 rounded-full font-medium text-sm"
                  whileHover={{ x: 5 }}
                >
                  Shop now <FiArrowRight className="ml-2" />
                </motion.div>
              </div>
              
          
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
