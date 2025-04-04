import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Men from "./Men.jpg";
import Women from "./Women.jpg";
import Accessories from "./Accessories.jpg";
import Shoes from "./Shoes.jpg";

const categories = [
  { name: "Men", image: Men, path: "/men" },
  { name: "Women", image: Women, path: "/women" },
  { name: "Accessories", image: Accessories, path: "/accessories" },
  { name: "Footwear", image: Shoes, path: "/footwear" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer transition-transform hover:shadow-xl"
            // whileHover={{ scale: 1.05 }}
            // transition={{ duration: 0.3 }}
          >
            <motion.img
              src={category.image}
              alt={category.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-gray-200 shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">{category.name}</h3>
            
            {/* View Button */}
            <motion.button
              onClick={() => navigate(category.path)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all duration-300"
             
              
            >
              View Category
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
