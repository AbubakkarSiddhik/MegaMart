import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import p1 from "./p1.jpg";
import p2 from "./p2.jpg";
import p3 from "./p3.jpg";
import p4 from "./p4.jpg";
import p5 from "./p5.jpg";
import p6 from "./p6.jpg";
import p7 from "./p7.jpg";
import p8 from "./p8.jpg";

import p10 from "./p10.jpg";
import p11 from "./p11.jpg";
import p12 from "./p12.jpg";

import p14 from "./p14.jpg";
import p15 from "./p15.jpg";
import p16 from "./p16.jpg";
import p17 from "./p17.jpg";
import p18 from "./p18.jpg";
import p19 from "./p19.jpg";
import p20 from "./p20.jpg";
import p21 from "./p21.jpg";
import p22 from "./p22.jpg";
import p23 from "./p23.jpg";
import p24 from "./p24.jpg";
import p25 from "./p25.jpg";
import p26 from "./p26.jpg";
import p27 from "./p27.jpg";
import p28 from "./p28.jpg";

import p30 from "./p30.jpg";
import p31 from "./p31.jpg";
import p32 from "./p32.jpg";
import p33 from "./p33.jpg";
import p34 from "./p34.jpg";
import p35 from "./p35.jpg";
import p36 from "./p36.jpg";
import p37 from "./p37.jpg";
import p38 from "./p38.jpg";
import p39 from "./p39.jpg";
import p40 from "./p40.jpg";
import p41 from "./p41.jpg";
import p42 from "./p42.jpg";
import p43 from "./p43.jpg";
import p44 from "./p44.jpg";
import p45 from "./p45.jpg";
import p46 from "./p46.jpg";
import p47 from "./p47.jpg";
import p48 from "./p48.jpg";
import p49 from "./p49.jpg";
import p50 from "./p50.jpg";
import p51 from "./p51.jpg";
import p52 from "./p52.jpg";
import p53 from "./p53.jpg";
import p54 from "./p54.jpg";
import p55 from "./p55.jpg";
import p56 from "./p56.jpg";
import p57 from "./p57.jpg";
import p58 from "./p58.jpg";
import p59 from "./p59.jpg";
import p60 from "./p60.jpg";
import p61 from "./p61.jpg";
import p62 from "./p62.jpg";
import p63 from "./p63.jpg";
import p64 from "./p64.jpg";
import p65 from "./p65.jpg";
import p66 from "./p66.jpg";
import p67 from "./p67.jpg";
import p68 from "./p68.jpg";
import p69 from "./p69.jpg";
import p70 from "./p70.jpg";
import p71 from "./p71.jpg";
import p72 from "./p72.jpg";
import p73 from "./p73.jpg";
import p74 from "./p74.jpg";
import p75 from "./p75.jpg";
import p76 from "./p76.jpg";
import p77 from "./p77.jpg";
import p78 from "./p78.jpg";
import p79 from "./p79.jpg";
import p80 from "./p80.jpg";
import p81 from "./p81.jpg";
import p82 from "./p82.jpg";
import p83 from "./p83.jpg";
import p84 from "./p84.jpg";
import p85 from "./p85.jpg";
import p86 from "./p86.jpg";
import p87 from "./p87.jpg";
import p88 from "./p88.jpg";
import p89 from "./p89.jpeg";
import p90 from "./p90.jpeg";
import p91 from "./p91.jpeg";
import p92 from "./p92.jpeg";
import p93 from "./p93.jpeg";
import p94 from "./p94.jpeg";
import p95 from "./p95.jpeg";




const products = [
  { id: 1, name: "Black Hoodie", price: 79.99, image: p1 },
  { id: 2, name: "Black Hoodie Side View", price: 99.99, image: p2 },
  { id: 3, name: "Grey Hoodie", price: 59.99, image: p3 },
  { id: 4, name: "Beige Hoodie", price: 199.99, image: p4 },
  { id: 5, name: "Navy Hoodie", price: 29.99, image: p5 },
  { id: 6, name: "Light Blue Denim Jacket", price: 89.99, image: p6 },
  { id: 7, name: "Light Blue Denim Jacket Back", price: 49.99, image: p7 },
  { id: 8, name: "Light Blue Denim Jacket (Model)", price: 119.99, image: p8 },
  { id: 10, name: "Light Blue Denim Jacket Back View", price: 149.99, image: p10 },
  { id: 11, name: "Two-Tone Denim Jacket", price: 179.99, image: p11 },
  { id: 12, name: "Dark Blue Denim Jacket", price: 49.99, image: p12 },
  { id: 14, name: "Brown Leather Jacket", price: 99.99, image: p14 },
  { id: 15, name: "Brown Leather Jacket Close-up", price: 129.99, image: p15 },
  { id: 16, name: "Brown Leather Jacket (Model)", price: 59.99, image: p16 },

  { id: 17, name: "Brown Leather Jacket", price: 79.99, image: p17 },
  { id: 18, name: "Black Formal Suit (Women)", price: 139.99, image: p18 },
  { id: 19, name: "Black Blazer", price: 159.99, image: p19 },
  { id: 20, name: "Grey Blazer (Women)", price: 89.99, image: p20 },
  { id: 21, name: "Brown Blazer (Women)", price: 39.99, image: p21 },
  { id: 22, name: "Beige Blazer (Women)", price: 109.99, image: p22 },
  { id: 23, name: "White Suit (Men)", price: 69.99, image: p23 },
  { id: 24, name: "Black Formal Suit Set", price: 59.99, image: p24 },
  { id: 25, name: "Grey Checkered Suit", price: 79.99, image: p25 },
  { id: 26, name: "Blue Formal Suit", price: 99.99, image: p26 },
  { id: 27, name: "Black Formal Suit", price: 129.99, image: p27 },
  { id: 28, name: "Navy Blue Formal Suit", price: 89.99, image: p28 },
 
  { id: 30, name: "Black Cargo Pants", price: 69.99, image: p30 },
  { id: 31, name: "Beige Cargo Pants", price: 29.99, image: p31 },
  { id: 32, name: "Khaki Cargo Pants", price: 49.99, image: p32 },

  { id: 33, name: "Beige Cargo Pants", price: 139.99, image: p33 },
  { id: 34, name: "Light Brown Cargo Pants", price: 19.99, image: p34 },
  { id: 35, name: "Cream Chino Pants", price: 39.99, image: p35 },
  { id: 36, name: "Beige Casual Pants", price: 34.99, image: p36 },
  { id: 37, name: "Khaki Straight-Fit Pants", price: 29.99, image: p37 },
  { id: 38, name: "Blue Slim Jeans", price: 79.99, image: p38 },
  { id: 39, name: "Dark Blue Denim Jeans", price: 89.99, image: p39 },
  { id: 40, name: "Classic Blue Jeans", price: 49.99, image: p40 },
  { id: 41, name: "Black Drawstring Shorts", price: 59.99, image: p41 },
  { id: 42, name: "Blue Casual Shorts", price: 24.99, image: p42 },
  { id: 43, name: "Brown Cotton Shorts", price: 39.99, image: p43 },
  { id: 44, name: "White High-Waisted Shorts", price: 19.99, image: p44 },
  { id: 45, name: "Red Sleeveless Tank", price: 59.99, image: p45 },
  { id: 46, name: "Gray Sleeveless Tank", price: 149.99, image: p46 },
  { id: 47, name: "Yellow Sleeveless Tank", price: 99.99, image: p47 },
  { id: 48, name: "Yellow Sleeveless Tank", price: 29.99, image: p48 },
{ id: 49, name: "Red V-Neck Sweater", price: 19.99, image: p49 },
{ id: 50, name: "Beige Knit Sweater", price: 29.99, image: p50 },
{ id: 51, name: "White Ribbed Sweater", price: 24.99, image: p51 },
{ id: 52, name: "Green Crew Neck Sweater", price: 39.99, image: p52 },
{ id: 53, name: "Blue V-Neck Sweater", price: 44.99, image: p53 },
{ id: 54, name: "Black Turtleneck Sweater", price: 19.99, image: p54 },
{ id: 55, name: "Red Turtleneck Sweater", price: 129.99, image: p55 },
{ id: 56, name: "White Turtleneck Sweater", price: 14.99, image: p56 },
{ id: 57, name: "Yellow Raincoat", price: 69.99, image: p57 },
{ id: 58, name: "Yellow Raincoat with Hood", price: 9.99, image: p58 },
{ id: 59, name: "Yellow Buttoned Raincoat", price: 29.99, image: p59 },
{ id: 60, name: "Red Raincoat with Hood", price: 89.99, image: p60 },
{ id: 61, name: "Black Leather Jacket", price: 39.99, image: p61 },
{ id: 62, name: "Brown Bomber Jacket", price: 14.99, image: p62 },

{ id: 63, name: "Black Bomber Jacket", price: 29.99, image: p63 },
{ id: 64, name: "Brown and Black Varsity Jacket", price: 9.99, image: p64 },
{ id: 65, name: "Black Leather Jacket", price: 119.99, image: p65 },
{ id: 66, name: "Black Joggers", price: 79.99, image: p66 },
{ id: 67, name: "Green Sweatpants", price: 99.99, image: p67 },
{ id: 68, name: "Gray Joggers", price: 59.99, image: p68 },
{ id: 69, name: "Black Joggers with White Stripes", price: 199.99, image: p69 },
{ id: 70, name: "Red Running Sweatpants", price: 29.99, image: p70 },
{ id: 71, name: "Athletic Running Joggers", price: 89.99, image: p71 },
{ id: 72, name: "Casual Jogging Outfit", price: 49.99, image: p72 },
{ id: 73, name: "Black Winter Coat", price: 119.99, image: p73 },
{ id: 74, name: "Brown Long Coat", price: 149.99, image: p74 },
{ id: 75, name: "Camel Long Coat", price: 69.99, image: p75 },
{ id: 76, name: "Light Gray Polo Shirt", price: 179.99, image: p76 },
{ id: 77, name: "Navy Blue Polo Shirt", price: 49.99, image: p77 },
{ id: 78, name: "Light Blue Formal Shirt", price: 139.99, image: p78 },
{ id: 79, name: "White Formal Shirt", price: 89.99, image: p79 },
{ id: 80, name: "Navy Blue Suit", price: 159.99, image: p80 },
{ id: 81, name: "Purple Dress Shirt", price: 39.99, image: p81 },
{ id: 82, name: "Classic White Shirt", price: 109.99, image: p82 },
{ id: 83, name: "Gray Blazer", price: 69.99, image: p83 },
{ id: 84, name: "Brown Checkered Suit", price: 59.99, image: p84 },
{ id: 85, name: "Dark Blue Checkered Suit", price: 79.99, image: p85 },
{ id: 86, name: "Blue Formal Suit with Red Tie", price: 99.99, image: p86 },
{ id: 87, name: "Elegant Double Suit Set", price: 129.99, image: p87 },
{ id: 88, name: "Gray Suit with Tie", price: 89.99, image: p88 },
{ id: 89, name: "Casual Blue Shirt", price: 69.99, image: p89 },
{ id: 90, name: "Pack of Formal Shirts", price: 29.99, image: p90 },
{ id: 91, name: "Plain Blue T-Shirt", price: 49.99, image: p91 },
{ id: 92, name: "White Graphic T-Shirt", price: 139.99, image: p92 },

{ id: 93, name: "Minimalist Navy T-Shirt", price: 19.99, image: p93, },
{ id: 94, name: "Futuristic Graphic Tee", price: 39.99, image: p94,  },
{ id: 95, name: "Casual Blue Sweatshirt", price: 34.99, image: p95,  }
];

const Shop = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>

      
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl"
              >
               
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />

              
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>

                 
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default Shop;