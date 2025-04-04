import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import f1 from "../E-commerce/Footwear/f1.jpg";
import f2 from "../E-commerce/Footwear/f2.jpg";
import f3 from "../E-commerce/Footwear/f3.jpg";
import f4 from "../E-commerce/Footwear/f4.jpg";
import f5 from "../E-commerce/Footwear/f5.jpg";
import f6 from "../E-commerce/Footwear/f6.jpg";
import f7 from "../E-commerce/Footwear/f7.jpg";
import f8 from "../E-commerce/Footwear/f8.jpg";
import f9 from "../E-commerce/Footwear/f9.jpg";
import f10 from "../E-commerce/Footwear/f10.jpg";
import f11 from "../E-commerce/Footwear/f11.jpg";
import f12 from "../E-commerce/Footwear/f12.jpg";
import f13 from "../E-commerce/Footwear/f13.jpg";
import f14 from "../E-commerce/Footwear/f14.jpg";
import f15 from "../E-commerce/Footwear/f15.jpg";
import f16 from "../E-commerce/Footwear/f16.jpg";
import f17 from "../E-commerce/Footwear/f17.jpg";
import f18 from "../E-commerce/Footwear/f18.jpg";
import f19 from "../E-commerce/Footwear/f19.jpg";
import f20 from "../E-commerce/Footwear/f20.jpg";
import f21 from "../E-commerce/Footwear/f15.jpg";
import f22 from "../E-commerce/Footwear/f16.jpg";
import f23 from "../E-commerce/Footwear/f17.jpg";
import f24 from "../E-commerce/Footwear/f18.jpg";
import f25 from "../E-commerce/Footwear/f19.jpg";

const footwearProducts = [
  { id: 1, name: "Cozy Pink Slippers", price: 2499, image: f1, category: "casual" },
  { id: 2, name: "Soft White Slides", price: 2949, image: f2, category: "casual" },
  { id: 3, name: "Beige Loafers", price: 4999, image: f3, category: "loafers" },
  { id: 4, name: "Perforated Slip-Ons", price: 4199, image: f4, category: "casual" },
  { id: 5, name: "Fur-Lined Moccasins", price: 5849, image: f5, category: "casual" },
  { id: 6, name: "Casual Grey Slip-Ons", price: 4599, image: f6, category: "casual" },
  { id: 7, name: "Trendy Pattern Sneakers", price: 6699, image: f7, category: "sneakers" },
  { id: 8, name: "Brown Leather Boots", price: 10999, image: f8, category: "boots" },
  { id: 9, name: "Classic Black Oxfords", price: 10099, image: f9, category: "formal" },
  { id: 10, name: "Light Brown Moccasins", price: 5449, image: f10, category: "casual" },
  { id: 11, name: "Tan Slip-On Loafers", price: 6299, image: f11, category: "loafers" },
  { id: 12, name: "Dark Brown Loafers", price: 6699, image: f12, category: "loafers" },
  { id: 13, name: "Vintage Heels", price: 7549, image: f13, category: "heels" },
  { id: 14, name: "Rust Orange Boots", price: 11799, image: f14, category: "boots" },
  { id: 15, name: "White Perforated Oxfords", price: 8399, image: f15, category: "formal" },
  { id: 16, name: "Grey High-Top Sneakers", price: 7549, image: f16, category: "sneakers" },
  { id: 17, name: "Pink High-Top Sneakers", price: 7099, image: f17, category: "sneakers" },
  { id: 18, name: "Elegant Black Boots", price: 12599, image: f18, category: "boots" },
  { id: 19, name: "Tan Leather Derby Shoes", price: 10099, image: f19, category: "formal" },
  { id: 20, name: "Shiny Black Formal Shoes", price: 10999, image: f20, category: "formal" },
  { id: 21, name: "Classic Leather Brogues", price: 11799, image: f21, category: "formal" },
  { id: 22, name: "Black and White Dress Shoes", price: 10099, image: f22, category: "formal" },
  { id: 23, name: "Brown Leather Shoes", price: 9249, image: f23, category: "formal" },
  { id: 24, name: "White Derby Shoes", price: 8399, image: f24, category: "formal" },
  { id: 25, name: "Polished Brown Formal Shoes", price: 10999, image: f25, category: "formal" }
];


const Footwear = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = footwearProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  const categories = [...new Set(footwearProducts.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Footwear Collection</h2>

       
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search footwear..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-1/2 flex flex-wrap gap-2 justify-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
               
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

               
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 mt-auto">₹{product.price}</p>

                 
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    sx={{ 
                      bgcolor: "primary.main", 
                      ":hover": { bgcolor: "primary.dark" },
                      mt: 'auto'
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No footwear found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default Footwear;
