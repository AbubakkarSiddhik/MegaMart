import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import a1 from "../E-commerce/Accessories/a1.jpg";
import a2 from "../E-commerce/Accessories/a2.jpg";
import a3 from "../E-commerce/Accessories/a3.jpg";
import a4 from "../E-commerce/Accessories/a4.jpg";
import a5 from "../E-commerce/Accessories/a5.jpg";
import a6 from "../E-commerce/Accessories/a6.jpg";
import a7 from "../E-commerce/Accessories/a7.jpg";
import a8 from "../E-commerce/Accessories/a8.jpg";
import a9 from "../E-commerce/Accessories/a9.jpg";
import a10 from "../E-commerce/Accessories/a10.jpg";
import a11 from "../E-commerce/Accessories/a11.jpg";
import a12 from "../E-commerce/Accessories/a12.jpg";
import a13 from "../E-commerce/Accessories/a13.jpg";
import a14 from "../E-commerce/Accessories/a14.jpg";
import a15 from "../E-commerce/Accessories/a15.jpeg";
import a16 from "../E-commerce/Accessories/a16.jpeg";
import a17 from "../E-commerce/Accessories/a17.jpg";
import a18 from "../E-commerce/Accessories/a18.jpeg";
import a19 from "../E-commerce/Accessories/a19.jpeg";
import a20 from "../E-commerce/Accessories/a20.jpeg";
import a21 from "../E-commerce/Accessories/a21.jpeg";
import a22 from "../E-commerce/Accessories/a22.jpeg";
import a23 from "../E-commerce/Accessories/a23.jpeg";
import a24 from "../E-commerce/Accessories/a24.jpeg";
import a25 from "../E-commerce/Accessories/a25.jpeg";
import a26 from "../E-commerce/Accessories/a26.jpeg";
import a27 from "../E-commerce/Accessories/a27.jpeg";
import a28 from "../E-commerce/Accessories/a28.jpeg";
import a29 from "../E-commerce/Accessories/a29.jpeg";
import a30 from "../E-commerce/Accessories/a30.jpeg";
import a31 from "../E-commerce/Accessories/a31.jpeg";
import a32 from "../E-commerce/Accessories/a32.jpeg";
import a33 from "../E-commerce/Accessories/a33.jpeg";
import a34 from "../E-commerce/Accessories/a34.jpeg";
import a35 from "../E-commerce/Accessories/a35.jpeg";
import a36 from "../E-commerce/Accessories/a36.jpeg";
import a37 from "../E-commerce/Accessories/a37.jpeg";
import a38 from "../E-commerce/Accessories/a38.jpeg";

const accessoriesProducts = [
  { id: 1, name: "Brown Leather Belt with Gold Buckle", price: 29.99, image: a1, category: "belts" },
  { id: 2, name: "Black Leather Belt with Gold Buckle", price: 24.99, image: a2, category: "belts" },
  { id: 3, name: "Brown Studded Western Belt", price: 59.99, image: a3, category: "belts" },
  { id: 4, name: "Tan Perforated Leather Belt", price: 39.99, image: a4, category: "belts" },
  { id: 5, name: "Dark Brown Belt with Gold Studded Buckle", price: 34.99, image: a5, category: "belts" },
  { id: 6, name: "Black Leather Belt with Rhinestone Buckle", price: 89.99, image: a6, category: "belts" },
  { id: 7, name: "Brown Leather Belt with Decorative Buckle", price: 45.99, image: a7, category: "belts" },
  { id: 8, name: "Black and Brown Reversible Belt with Metal Buckle", price: 49.99, image: a8, category: "belts" },
  { id: 9, name: "Classic Black Leather Belt with Silver Buckle", price: 29.99, image: a9, category: "belts" },
  { id: 10, name: "Dark Brown Formal Belt with Silver Buckle", price: 19.99, image: a10, category: "belts" },
  { id: 11, name: "Dark Brown Belt with Silver Rectangular Buckle", price: 35.99, image: a11, category: "belts" },
  { id: 12, name: "Brown Leather Belt with Textured Silver Buckle", price: 42.99, image: a12, category: "belts" },
  { id: 13, name: "Black Leather Belt with Wide Silver Buckle", price: 27.99, image: a13, category: "belts" },
  { id: 14, name: "Black Leather Belt with Square Silver Buckle", price: 22.99, image: a14, category: "belts" },
  { id: 15, name: "Two-Tone Brown Leather Belt with Gold Buckle", price: 31.99, image: a15, category: "belts" },
  { id: 16, name: "Brown Leather Western Belt with Large Buckle", price: 39.99, image: a16, category: "belts" },
  { id: 17, name: "Black Leather Belt with Sleek Silver Buckle", price: 29.99, image: a17, category: "belts" },
  { id: 18, name: "Luxury Gold-Tone Chronograph Watch", price: 199.99, image: a18, category: "watches" },
  { id: 19, name: "Classic Rose Gold Women's Watch", price: 179.99, image: a19, category: "watches" },
  { id: 20, name: "Elegant Roman Numeral Rose Gold Watch", price: 189.99, image: a20, category: "watches" },
  { id: 21, name: "Black and Gold Luxury Wristwatch", price: 159.99, image: a21, category: "watches" },
  { id: 22, name: "Rose Gold Chronograph Watch with Diamond Bezel", price: 249.99, image: a22, category: "watches" },
  { id: 23, name: "Minimalist Rose Gold Ladies Watch", price: 129.99, image: a23, category: "watches" },
  { id: 24, name: "Two-Tone Rose Gold and Black Watch", price: 149.99, image: a24, category: "watches" },
  { id: 25, name: "Black Leather Strap Watch with Gold Dial", price: 139.99, image: a25, category: "watches" },
  { id: 26, name: "Stainless Steel Men's Watch with White Dial", price: 169.99, image: a26, category: "watches" },
  { id: 27, name: "Gold and Black Chronograph Watch", price: 199.99, image: a27, category: "watches" },
  { id: 28, name: "Luxury Black and Gold Wristwatch", price: 219.99, image: a28, category: "watches" },
  { id: 29, name: "Vintage Black Chronograph Watch", price: 189.99, image: a29, category: "watches" },
  { id: 30, name: "Luxe Gold and Black Sports Watch", price: 209.99, image: a30, category: "watches" },
  { id: 31, name: "Sleek Black Chronograph Watch", price: 179.99, image: a31, category: "watches" },
  { id: 32, name: "Black and Gold Luxury Sports Watch", price: 189.99, image: a32, category: "watches" },
  { id: 33, name: "Black Dial Stainless Steel Watch", price: 199.99, image: a33, category: "watches" },
  { id: 34, name: "Classic Black Leather Chronograph Watch", price: 169.99, image: a34, category: "watches" },
  { id: 35, name: "Silver and Black Chronograph with Brown Leather Strap", price: 209.99, image: a35, category: "watches" },
  { id: 36, name: "Elegant Blue Dial Leather Strap Watch", price: 159.99, image: a36, category: "watches" },
  { id: 37, name: "Vintage Brown Leather Strap Watch", price: 189.99, image: a37, category: "watches" },
  { id: 38, name: "Luxury Silver and Black Sports Watch", price: 219.99, image: a38, category: "watches" },
];

const Accessories = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = accessoriesProducts.filter((product) => {
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

  
  const categories = [...new Set(accessoriesProducts.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Accessories Collection</h2>

      
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search accessories..."
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
                  <p className="text-gray-600 mb-4 mt-auto">${product.price.toFixed(2)}</p>

               
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
              <p className="text-gray-500 text-lg">No accessories found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default Accessories;