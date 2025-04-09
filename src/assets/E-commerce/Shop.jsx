import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button, Chip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaShoppingCart, FaRupeeSign, FaStar } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { MdDiscount } from "react-icons/md";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

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
  { id: 1, name: "Black Hoodie", price: 6659, image: p1, category: "hoodie" },
  { id: 2, name: "Black Hoodie Side View", price: 8319, image: p2, category: "hoodie" },
  { id: 3, name: "Grey Hoodie", price: 4999, image: p3, category: "hoodie" },
  { id: 4, name: "Beige Hoodie", price: 16659, image: p4, category: "hoodie" },
  { id: 5, name: "Navy Hoodie", price: 2499, image: p5, category: "hoodie" },
  { id: 6, name: "Light Blue Denim Jacket", price: 7499, image: p6, category: "jacket" },
  { id: 7, name: "Light Blue Denim Jacket Back", price: 4166, image: p7, category: "jacket" },
  { id: 8, name: "Light Blue Denim Jacket (Model)", price: 9999, image: p8, category: "jacket" },
  { id: 10, name: "Light Blue Denim Jacket Back View", price: 12499, image: p10, category: "jacket" },
  { id: 11, name: "Two-Tone Denim Jacket", price: 14999, image: p11, category: "jacket" },
  { id: 12, name: "Dark Blue Denim Jacket", price: 4166, image: p12, category: "jacket" },
  { id: 14, name: "Brown Leather Jacket", price: 8333, image: p14, category: "jacket" },
  { id: 15, name: "Brown Leather Jacket Close-up", price: 10833, image: p15, category: "jacket" },
  { id: 16, name: "Brown Leather Jacket (Model)", price: 4999, image: p16, category: "jacket" },
  { id: 17, name: "Brown Leather Jacket", price: 6666, image: p17, category: "jacket" },
  { id: 18, name: "Black Formal Suit (Women)", price: 11666, image: p18, category: "suit" },
  { id: 19, name: "Black Blazer", price: 13333, image: p19, category: "suit" },
  { id: 20, name: "Grey Blazer (Women)", price: 7499, image: p20, category: "suit" },
  { id: 21, name: "Brown Blazer (Women)", price: 3333, image: p21, category: "suit" },
  { id: 22, name: "Beige Blazer (Women)", price: 9166, image: p22, category: "suit" },
  { id: 23, name: "White Suit (Men)", price: 5833, image: p23, category: "suit" },
  { id: 24, name: "Black Formal Suit Set", price: 4999, image: p24, category: "suit" },
  { id: 25, name: "Grey Checkered Suit", price: 6666, image: p25, category: "suit" },
  { id: 26, name: "Blue Formal Suit", price: 8333, image: p26, category: "suit" },
  { id: 27, name: "Black Formal Suit", price: 10833, image: p27, category: "suit" },
  { id: 28, name: "Navy Blue Formal Suit", price: 7499, image: p28, category: "suit" },
  { id: 30, name: "Black Cargo Pants", price: 5833, image: p30, category: "pants" },
  { id: 31, name: "Beige Cargo Pants", price: 2499, image: p31, category: "pants" },
  { id: 32, name: "Khaki Cargo Pants", price: 4166, image: p32, category: "pants" },
  { id: 33, name: "Beige Cargo Pants", price: 11666, image: p33, category: "pants" },
  { id: 34, name: "Light Brown Cargo Pants", price: 1666, image: p34, category: "pants" },
  { id: 35, name: "Cream Chino Pants", price: 3333, image: p35, category: "pants" },
  { id: 36, name: "Beige Casual Pants", price: 2916, image: p36, category: "pants" },
  { id: 37, name: "Khaki Straight-Fit Pants", price: 2499, image: p37, category: "pants" },
  { id: 38, name: "Blue Slim Jeans", price: 6666, image: p38, category: "pants" },
  { id: 39, name: "Dark Blue Denim Jeans", price: 7499, image: p39, category: "pants" },
  { id: 40, name: "Classic Blue Jeans", price: 4166, image: p40, category: "pants" },
  { id: 41, name: "Black Drawstring Shorts", price: 4999, image: p41, category: "pants" },
  { id: 42, name: "Blue Casual Shorts", price: 2083, image: p42, category: "pants" },
  { id: 43, name: "Brown Cotton Shorts", price: 3333, image: p43, category: "pants" },
  { id: 44, name: "White High-Waisted Shorts", price: 1666, image: p44, category: "pants" },
  { id: 45, name: "Red Sleeveless Tank", price: 4999, image: p45, category: "shirt" },
  { id: 46, name: "Gray Sleeveless Tank", price: 12499, image: p46, category: "shirt" },
  { id: 47, name: "Yellow Sleeveless Tank", price: 8333, image: p47, category: "shirt" },
  { id: 48, name: "Yellow Sleeveless Tank", price: 2499, image: p48, category: "shirt" },
  { id: 49, name: "Red V-Neck Sweater", price: 1666, image: p49, category: "sweater" },
  { id: 50, name: "Beige Knit Sweater", price: 2499, image: p50, category: "sweater" },
  { id: 51, name: "White Ribbed Sweater", price: 2083, image: p51, category: "sweater" },
  { id: 52, name: "Green Crew Neck Sweater", price: 3333, image: p52, category: "sweater" },
  { id: 53, name: "Blue V-Neck Sweater", price: 3749, image: p53, category: "sweater" },
  { id: 54, name: "Black Turtleneck Sweater", price: 1666, image: p54, category: "sweater" },
  { id: 55, name: "Red Turtleneck Sweater", price: 10833, image: p55, category: "sweater" },
  { id: 56, name: "White Turtleneck Sweater", price: 1249, image: p56, category: "sweater" },
  { id: 57, name: "Yellow Raincoat", price: 5833, image: p57, category: "jacket" },
  { id: 58, name: "Yellow Raincoat with Hood", price: 833, image: p58, category: "jacket" },
  { id: 59, name: "Yellow Buttoned Raincoat", price: 2499, image: p59, category: "jacket" },
  { id: 60, name: "Red Raincoat with Hood", price: 7499, image: p60, category: "jacket" },
  { id: 61, name: "Black Leather Jacket", price: 3333, image: p61, category: "jacket" },
  { id: 62, name: "Brown Bomber Jacket", price: 1249, image: p62, category: "jacket" },
  { id: 63, name: "Black Bomber Jacket", price: 2499, image: p63, category: "jacket" },
  { id: 64, name: "Brown and Black Varsity Jacket", price: 833, image: p64, category: "jacket" },
  { id: 65, name: "Black Leather Jacket", price: 9999, image: p65, category: "jacket" },
  { id: 66, name: "Black Joggers", price: 6666, image: p66, category: "pants" },
  { id: 67, name: "Green Sweatpants", price: 8333, image: p67, category: "pants" },
  { id: 68, name: "Gray Joggers", price: 4999, image: p68, category: "pants" },
  { id: 69, name: "Black Joggers with White Stripes", price: 16666, image: p69, category: "pants" },
  { id: 70, name: "Red Running Sweatpants", price: 2499, image: p70, category: "pants" },
  { id: 71, name: "Athletic Running Joggers", price: 7499, image: p71, category: "pants" },
  { id: 72, name: "Casual Jogging Outfit", price: 4166, image: p72, category: "pants" },
  { id: 73, name: "Black Winter Coat", price: 9999, image: p73, category: "jacket" },
  { id: 74, name: "Brown Long Coat", price: 12499, image: p74, category: "jacket" },
  { id: 75, name: "Camel Long Coat", price: 5833, image: p75, category: "jacket" },
  { id: 76, name: "Light Gray Polo Shirt", price: 14999, image: p76, category: "shirt" },
  { id: 77, name: "Navy Blue Polo Shirt", price: 4166, image: p77, category: "shirt" },
  { id: 78, name: "Light Blue Formal Shirt", price: 11666, image: p78, category: "shirt" },
  { id: 79, name: "White Formal Shirt", price: 7499, image: p79, category: "shirt" },
  { id: 80, name: "Navy Blue Suit", price: 13333, image: p80, category: "suit" },
  { id: 81, name: "Purple Dress Shirt", price: 3333, image: p81, category: "shirt" },
  { id: 82, name: "Classic White Shirt", price: 9166, image: p82, category: "shirt" },
  { id: 83, name: "Gray Blazer", price: 5833, image: p83, category: "suit" },
  { id: 84, name: "Brown Checkered Suit", price: 4999, image: p84, category: "suit" },
  { id: 85, name: "Dark Blue Checkered Suit", price: 6666, image: p85, category: "suit" },
  { id: 86, name: "Blue Formal Suit with Red Tie", price: 8333, image: p86, category: "suit" },
  { id: 87, name: "Elegant Double Suit Set", price: 10833, image: p87, category: "suit" },
  { id: 88, name: "Gray Suit with Tie", price: 7499, image: p88, category: "suit" },
  { id: 89, name: "Casual Blue Shirt", price: 5833, image: p89, category: "shirt" },
  { id: 90, name: "Pack of Formal Shirts", price: 2499, image: p90, category: "shirt" },
  { id: 91, name: "Plain Blue T-Shirt", price: 4166, image: p91, category: "shirt" },
  { id: 92, name: "White Graphic T-Shirt", price: 11666, image: p92, category: "shirt" },
  { id: 93, name: "Minimalist Navy T-Shirt", price: 1666, image: p93, category: "shirt" },
  { id: 94, name: "Futuristic Graphic Tee", price: 3333, image: p94, category: "shirt" },
  { id: 95, name: "Casual Blue Sweatshirt", price: 2916, image: p95, category: "sweater" }
];

const Shop = () => {
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products", icon: <GiClothes /> },
    { id: "hoodie", name: "Hoodies", icon: <GiClothes /> },
    { id: "jacket", name: "Jackets", icon: <GiClothes /> },
    { id: "suit", name: "Suits", icon: <GiClothes /> },
    { id: "pants", name: "Pants", icon: <GiClothes /> },
    { id: "shirt", name: "Shirts", icon: <GiClothes /> },
    { id: "sweater", name: "Sweaters", icon: <GiClothes /> },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "all" || 
      product.category === selectedCategory;
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
      icon: <FaShoppingCart />,
    });
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored"
      });
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored"
      });
    }
  };

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            <GiClothes className="text-4xl" />
            <h2 className="text-3xl sm:text-4xl font-bold">Explore Our Collection</h2>
          </div>
          <p className="text-center mt-2 text-blue-100">
            Premium fashion for every style
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-10 bg-white rounded-xl shadow-sm p-6">
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const rating = getRandomRating();
              const isNew = Math.random() > 0.7;
              const isOnSale = Math.random() > 0.8;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100"
                >
                  {/* Product image with badges */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 transition-colors ${
                        wishlist.some(item => item.id === product.id)
                          ? "text-red-500 hover:bg-red-100"
                          : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
                      }`}
                    >
                      {wishlist.some(item => item.id === product.id) ? (
                        <Favorite fontSize="small" />
                      ) : (
                        <FavoriteBorder fontSize="small" />
                      )}
                    </button>
                    {/* Badges */}
                    {isNew && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                    {isOnSale && (
                      <div className="absolute top-12 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                        <MdDiscount className="mr-1" />
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <Chip
                        label={product.category}
                        size="small"
                        icon={<GiClothes fontSize="small" />}
                        className="text-xs capitalize bg-gray-100"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.floor(rating) ? "fill-current" : "fill-current opacity-30"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <FaRupeeSign className="text-gray-700 mr-1" />
                        <span className="text-xl font-bold text-gray-900">
                          {product.price.toLocaleString()}
                        </span>
                        {isOnSale && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{(product.price * 1.2).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to cart button */}
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        backgroundColor: '#3b82f6',
                        '&:hover': { backgroundColor: '#2563eb' },
                        borderRadius: '8px',
                        padding: '8px 16px',
                        textTransform: 'none',
                        fontWeight: 'medium',
                        transition: 'all 0.2s',
                        '&:active': { transform: 'scale(0.98)' }
                      }}
                      startIcon={<FaShoppingCart />}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <FaSearch className="mx-auto text-5xl text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter options
            </p>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Shop;
