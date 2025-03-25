import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import m1 from "../E-commerce/Men/m1.jpg";
import m2 from "../E-commerce/Men/m2.jpg";
import m3 from "../E-commerce/Men/m3.jpg";
import m4 from "../E-commerce/Men/m4.jpg";
import m5 from "../E-commerce/Men/m5.jpg";
import m6 from "../E-commerce/Men/m6.jpg";
import m7 from "../E-commerce/Men/m7.jpg";
import m8 from "../E-commerce/Men/m8.jpg";
import m9 from "../E-commerce/Men/m9.jpg";
import m10 from "../E-commerce/Men/m10.jpg";
import m11 from "../E-commerce/Men/m11.jpg";
import m12 from "../E-commerce/Men/m12.jpg";
import m13 from "../E-commerce/Men/m13.jpg";
import m14 from "../E-commerce/Men/m14.jpg";
import m15 from "../E-commerce/Men/m15.jpg";
import m16 from "../E-commerce/Men/m16.jpg";
import m17 from "../E-commerce/Men/m17.jpg";
import m18 from "../E-commerce/Men/m18.jpg";
import m19 from "../E-commerce/Men/m19.jpg";
import m20 from "../E-commerce/Men/m20.jpg";
import m21 from "../E-commerce/Men/m21.jpg";
import m22 from "../E-commerce/Men/m22.jpg";
import m23 from "../E-commerce/Men/m23.jpg";
import m24 from "../E-commerce/Men/m24.jpg";
import m25 from "../E-commerce/Men/m25.jpg";
import m26 from "../E-commerce/Men/m26.jpg";
import m27 from "../E-commerce/Men/m27.jpg";
import m28 from "../E-commerce/Men/m28.jpg";
import m29 from "../E-commerce/Men/m29.jpg";
import m30 from "../E-commerce/Men/m30.jpg";
import m31 from "../E-commerce/Men/m31.jpg";
import m32 from "../E-commerce/Men/m32.jpg";
import m33 from "../E-commerce/Men/m33.jpg";
import m34 from "../E-commerce/Men/m34.jpg";
import m35 from "../E-commerce/Men/m35.jpg";
import m36 from "../E-commerce/Men/m36.jpg";
import m37 from "../E-commerce/Men/m37.jpg";
import m38 from "../E-commerce/Men/m38.jpg";
import m39 from "../E-commerce/Men/m39.jpg";


const menProducts = [
    { id: 1, name: "Beige Hoodie", price: 49.99, image: m1, category: "hoodies" },
    { id: 2, name: "Black Hoodie", price: 59.99, image: m2, category: "hoodies" },
    { id: 3, name: "Denim Jacket", price: 79.99, image: m3, category: "jackets" },
    { id: 4, name: "Brown Leather Jacket", price: 129.99, image: m4, category: "jackets" },
    { id: 5, name: "White Suit", price: 199.99, image: m5, category: "suits" },
    { id: 6, name: "Formal Suit Set", price: 249.99, image: m6, category: "suits" },
    { id: 7, name: "Classic Grey Suit", price: 219.99, image: m7, category: "suits" },
    { id: 8, name: "Blue Formal Suit", price: 209.99, image: m8, category: "suits" },
    { id: 9, name: "Black Slim Fit Suit", price: 229.99, image: m9, category: "suits" },
    { id: 10, name: "Navy Blue Suit", price: 239.99, image: m10, category: "suits" },
    { id: 11, name: "Casual Joggers", price: 59.99, image: m11, category: "pants" },
    { id: 12, name: "Beige Cargo Pants", price: 69.99, image: m12, category: "pants" },
    { id: 13, name: "Casual Chino Pants", price: 64.99, image: m13, category: "pants" },
    { id: 14, name: "Dark Brown Cargo Pants", price: 74.99, image: m14, category: "pants" },
    { id: 15, name: "Light Beige Cargo Pants", price: 79.99, image: m15, category: "pants" },
    { id: 16, name: "Summer Casual Outfit", price: 89.99, image: m16, category: "casual wear" },
    { id: 17, name: "Khaki Pants with Red Shirt", price: 54.99, image: m17, category: "pants" },
    { id: 18, name: "Brown Jacket with Beige Pants", price: 109.99, image: m18, category: "jackets" },
    { id: 19, name: "Black Bomber Jacket", price: 99.99, image: m19, category: "jackets" },
  { id: 20, name: "Casual Varsity Jacket", price: 89.99, image: m20, category: "jackets" },
  { id: 21, name: "Black Leather Jacket", price: 129.99, image: m21, category: "jackets" },
  { id: 22, name: "Black Joggers", price: 49.99, image: m22, category: "pants" },
  { id: 23, name: "Dark Green Joggers", price: 54.99, image: m23, category: "pants" },
  { id: 24, name: "Gray Joggers", price: 52.99, image: m24, category: "pants" },
  { id: 25, name: "Striped Black Track Pants", price: 44.99, image: m25, category: "activewear" },
  { id: 26, name: "Red Running Track Pants", price: 42.99, image: m26, category: "activewear" },
  { id: 27, name: "Casual Running Sweatpants", price: 47.99, image: m27, category: "activewear" },
  { id: 28, name: "Navy Blue Polo Shirt", price: 39.99, image: m28, category: "shirts" },
  { id: 29, name: "Blue Checkered Shirt", price: 49.99, image: m29, category: "shirts" },
  { id: 30, name: "White Formal Shirt", price: 59.99, image: m30, category: "shirts" },
  { id: 31, name: "Lavender Dress Shirt", price: 54.99, image: m31, category: "shirts" },
  { id: 32, name: "Purple Shirt with Tie", price: 64.99, image: m32, category: "shirts" },
  { id: 33, name: "White Office Shirt", price: 55.99, image: m33, category: "shirts" },
  { id: 34, name: "Light Gray Blazer Suit", price: 199.99, image: m34, category: "suits" },
  { id: 35, name: "Brown Three-Piece Suit", price: 249.99, image: m35, category: "suits" },
  { id: 36, name: "Navy Blue Three-Piece Suit", price: 259.99, image: m36, category: "suits" },
  { id: 37, name: "Navy Blue Three-Piece Suit", price: 269.99, image: m37, category: "suits" },
  { id: 38, name: "Rust Brown Slim-Fit Suit", price: 259.99, image: m38, category: "suits" },
  { id: 39, name: "Charcoal Gray Business Suit", price: 239.99, image: m39, category: "suits" }
  ];
  

const Men = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = menProducts.filter((product) => {
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

  
  const categories = [...new Set(menProducts.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Men's Collection</h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search men's products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-1/2 flex flex-wrap gap-2 justify-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default Men;