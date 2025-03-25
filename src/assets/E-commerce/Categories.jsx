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
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5, delay: index * 0.1 }}
            // whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer transition-transform"
            onClick={() => navigate(category.path)}
          >
            <motion.img
              src={category.image}
              alt={category.name}
              className="w-50 h-50 object-cover rounded-full border-4 border-gray-200 shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">{category.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
