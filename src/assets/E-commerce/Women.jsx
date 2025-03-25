import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import w1 from "../E-commerce/Women/w1.jpg";
import w2 from "../E-commerce/Women/w2.jpg";
import w3 from "../E-commerce/Women/w3.jpg";
import w4 from "../E-commerce/Women/w4.jpg";
import w5 from "../E-commerce/Women/w5.jpg";
import w6 from "../E-commerce/Women/w6.jpg";
import w7 from "../E-commerce/Women/w7.jpg";
import w8 from "../E-commerce/Women/w8.jpg";
import w9 from "../E-commerce/Women/w9.jpg";
import w10 from "../E-commerce/Women/w10.jpg";
import w11 from "../E-commerce/Women/w11.jpg";
import w12 from "../E-commerce/Women/w12.jpg";
import w13 from "../E-commerce/Women/w13.jpg";
import w14 from "../E-commerce/Women/w14.jpg";
import w15 from "../E-commerce/Women/w15.jpg";
import w16 from "../E-commerce/Women/w16.jpg";
import w17 from "../E-commerce/Women/w17.jpg";
import w18 from "../E-commerce/Women/w18.jpg";
import w19 from "../E-commerce/Women/w19.jpg";
import w20 from "../E-commerce/Women/w20.jpg";
import w21 from "../E-commerce/Women/w21.jpg";
import w22 from "../E-commerce/Women/w22.jpg";
import w23 from "../E-commerce/Women/w23.jpg";
import w24 from "../E-commerce/Women/w24.jpg";
import w25 from "../E-commerce/Women/w25.jpeg";
import w26 from "../E-commerce/Women/w26.jpeg";
import w27 from "../E-commerce/Women/w27.jpeg";
import w28 from "../E-commerce/Women/w28.jpeg";
import w29 from "../E-commerce/Women/w29.jpeg";
import w30 from "../E-commerce/Women/w30.jpeg";
import w31 from "../E-commerce/Women/w31.jpeg";
import w32 from "../E-commerce/Women/w32.jpeg";
import w33 from "../E-commerce/Women/w33.jpeg";
import w34 from "../E-commerce/Women/w34.jpeg";
import w35 from "../E-commerce/Women/w35.jpeg";
import w36 from "../E-commerce/Women/w36.jpeg";
import w37 from "../E-commerce/Women/w37.jpeg";
import w38 from "../E-commerce/Women/w38.jpeg";
import w39 from "../E-commerce/Women/w39.jpeg";
import w40 from "../E-commerce/Women/w40.jpeg";
import w41 from "../E-commerce/Women/w41.jpeg";
import w42 from "../E-commerce/Women/w42.jpeg";
import w43 from "../E-commerce/Women/w43.jpeg";
import w44 from "../E-commerce/Women/w44.jpeg";
import w45 from "../E-commerce/Women/w45.jpeg";

const womenProducts = [
  { id: 1, name: "Red Dupatta Suit", price: 49.99, image: w1, category: "ethnic" },
  { id: 2, name: "Green Salwar Kameez", price: 54.99, image: w2, category: "ethnic" },
  { id: 3, name: "Floral Anarkali Dress", price: 59.99, image: w3, category: "ethnic" },
  { id: 4, name: "Beige Dupatta Set", price: 44.99, image: w4, category: "ethnic" },
  { id: 5, name: "Yellow Suit", price: 39.99, image: w5, category: "ethnic" },
  { id: 6, name: "White Ethnic Gown", price: 64.99, image: w6, category: "gowns" },
  { id: 7, name: "Golden & Brown Lehenga", price: 79.99, image: w7, category: "lehengas" },
  { id: 8, name: "Blue & Gold Silk Saree", price: 69.99, image: w8, category: "sarees" },
  { id: 9, name: "Lavender Flowy Gown", price: 74.99, image: w9, category: "gowns" },
  { id: 10, name: "Lilac Net Lehenga", price: 89.99, image: w10, category: "lehengas" },
  { id: 11, name: "Traditional Green Saree", price: 65.99, image: w11, category: "sarees" },
  { id: 12, name: "Western White Long Dress", price: 55.99, image: w12, category: "western" },
  { id: 13, name: "Floral Printed Pink Dress", price: 45.99, image: w13, category: "western" },
  { id: 14, name: "Purple Pleated Dress", price: 49.99, image: w14, category: "western" },
  { id: 15, name: "Casual Denim Jacket Outfit", price: 59.99, image: w15, category: "western" },
  { id: 16, name: "Red Evening Dress", price: 49.99, image: w16, category: "western" },
  { id: 17, name: "Black Floral Midi Dress", price: 54.99, image: w17, category: "western" },
  { id: 18, name: "Red Designer Dress", price: 59.99, image: w18, category: "western" },
  { id: 19, name: "Brown Elegant Jumpsuit", price: 44.99, image: w19, category: "western" },
  { id: 20, name: "Blue Ballroom Gown", price: 89.99, image: w20, category: "gowns" },
  { id: 21, name: "Sparkly Blue Party Dress", price: 79.99, image: w21, category: "western" },
  { id: 22, name: "White Wedding Gown", price: 199.99, image: w22, category: "wedding" },
  { id: 23, name: "Pink Embroidered Gown", price: 129.99, image: w23, category: "gowns" },
  { id: 24, name: "Turquoise Flowy Dress", price: 99.99, image: w24, category: "western" },
  { id: 25, name: "Red Traditional Saree", price: 69.99, image: w25, category: "sarees" },
  { id: 26, name: "Pink & Purple Saree", price: 64.99, image: w26, category: "sarees" },
  { id: 27, name: "Grey & Blue Border Saree", price: 74.99, image: w27, category: "sarees" },
  { id: 28, name: "Purple Silk Saree", price: 79.99, image: w28, category: "sarees" },
  { id: 29, name: "Golden Yellow Saree", price: 69.99, image: w29, category: "sarees" },
  { id: 30, name: "Beige & Red Border Saree", price: 59.99, image: w30, category: "sarees" },
  { id: 31, name: "Maroon & Gold Saree", price: 64.99, image: w31, category: "sarees" },
  { id: 32, name: "Pink & Green Traditional Saree", price: 74.99, image: w32, category: "sarees" },
  { id: 33, name: "Red & Gold Banarasi Saree", price: 79.99, image: w33, category: "sarees" },
  { id: 34, name: "Dark Green & Red Saree", price: 69.99, image: w34, category: "sarees" },
  { id: 35, name: "Orange & Gold Designer Saree", price: 84.99, image: w35, category: "sarees" },
  { id: 36, name: "Golden Brown Kanjivaram Saree", price: 89.99, image: w36, category: "sarees" },
  { id: 37, name: "Green & Pink Embroidered Saree", price: 79.99, image: w37, category: "sarees" },
  { id: 38, name: "Brown & Black Ethnic Saree", price: 72.99, image: w38, category: "sarees" },
  { id: 39, name: "Peach & Orange Designer Saree", price: 77.99, image: w39, category: "sarees" },
  { id: 40, name: "Olive Green Silk Saree", price: 69.99, image: w40, category: "sarees" },
  { id: 41, name: "Royal Blue & Gold Saree", price: 89.99, image: w41, category: "sarees" },
  { id: 42, name: "Navy Blue & Red Saree", price: 84.99, image: w42, category: "sarees" },
  { id: 43, name: "Black & Gold Traditional Saree", price: 79.99, image: w43, category: "sarees" },
  { id: 44, name: "Pink & Golden Silk Saree", price: 89.99, image: w44, category: "sarees" },
  { id: 45, name: "Dual-Tone Saree Combo", price: 99.99, image: w45, category: "sarees" }
];

const Women = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = womenProducts.filter((product) => {
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

  const categories = [...new Set(womenProducts.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Women's Collection</h2>

       
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search women's products..."
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
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default Women;