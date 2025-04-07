import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button, Chip, Rating, Badge } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShoppingCart,
  Search,
  Favorite,
  FilterList,
  FavoriteBorder,
  LocalOffer,
  Star,
  CurrencyRupee,
  Man
} from "@mui/icons-material";
import {  FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";


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
  { id: 1, name: "Beige Hoodie", price: 4150, image: m1, category: "hoodies" },
  { id: 2, name: "Black Hoodie", price: 4970, image: m2, category: "hoodies" },
  { id: 3, name: "Denim Jacket", price: 6640, image: m3, category: "jackets" },
  { id: 4, name: "Brown Leather Jacket", price: 10790, image: m4, category: "jackets" },
  { id: 5, name: "White Suit", price: 16600, image: m5, category: "suits" },
  { id: 6, name: "Formal Suit Set", price: 20750, image: m6, category: "suits" },
  { id: 7, name: "Classic Grey Suit", price: 18250, image: m7, category: "suits" },
  { id: 8, name: "Blue Formal Suit", price: 17430, image: m8, category: "suits" },
  { id: 9, name: "Black Slim Fit Suit", price: 19090, image: m9, category: "suits" },
  { id: 10, name: "Navy Blue Suit", price: 19920, image: m10, category: "suits" },
  { id: 11, name: "Casual Joggers", price: 4970, image: m11, category: "pants" },
  { id: 12, name: "Beige Cargo Pants", price: 5810, image: m12, category: "pants" },
  { id: 13, name: "Casual Chino Pants", price: 5400, image: m13, category: "pants" },
  { id: 14, name: "Dark Brown Cargo Pants", price: 6220, image: m14, category: "pants" },
  { id: 15, name: "Light Beige Cargo Pants", price: 6640, image: m15, category: "pants" },
  { id: 16, name: "Summer Casual Outfit", price: 7470, image: m16, category: "casual wear" },
  { id: 17, name: "Khaki Pants with Red Shirt", price: 4560, image: m17, category: "pants" },
  { id: 18, name: "Brown Jacket with Beige Pants", price: 9100, image: m18, category: "jackets" },
  { id: 19, name: "Black Bomber Jacket", price: 8300, image: m19, category: "jackets" },
  { id: 20, name: "Casual Varsity Jacket", price: 7470, image: m20, category: "jackets" },
  { id: 21, name: "Black Leather Jacket", price: 10790, image: m21, category: "jackets" },
  { id: 22, name: "Black Joggers", price: 4150, image: m22, category: "pants" },
  { id: 23, name: "Dark Green Joggers", price: 4560, image: m23, category: "pants" },
  { id: 24, name: "Gray Joggers", price: 4390, image: m24, category: "pants" },
  { id: 25, name: "Striped Black Track Pants", price: 3730, image: m25, category: "activewear" },
  { id: 26, name: "Red Running Track Pants", price: 3560, image: m26, category: "activewear" },
  { id: 27, name: "Casual Running Sweatpants", price: 3970, image: m27, category: "activewear" },
  { id: 28, name: "Navy Blue Polo Shirt", price: 3320, image: m28, category: "shirts" },
  { id: 29, name: "Blue Checkered Shirt", price: 4150, image: m29, category: "shirts" },
  { id: 30, name: "White Formal Shirt", price: 4970, image: m30, category: "shirts" },
  { id: 31, name: "Lavender Dress Shirt", price: 4560, image: m31, category: "shirts" },
  { id: 32, name: "Purple Shirt with Tie", price: 5400, image: m32, category: "shirts" },
  { id: 33, name: "White Office Shirt", price: 4630, image: m33, category: "shirts" },
  { id: 34, name: "Light Gray Blazer Suit", price: 16600, image: m34, category: "suits" },
  { id: 35, name: "Brown Three-Piece Suit", price: 20750, image: m35, category: "suits" },
  { id: 36, name: "Navy Blue Three-Piece Suit", price: 21580, image: m36, category: "suits" },
  { id: 37, name: "Navy Blue Three-Piece Suit", price: 22390, image: m37, category: "suits" },
  { id: 38, name: "Rust Brown Slim-Fit Suit", price: 21580, image: m38, category: "suits" },
  { id: 39, name: "Charcoal Gray Business Suit", price: 19920, image: m39, category: "suits" }
];

const Men = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [wishlist, setWishlist] = useState([]);

  // Get unique categories
  const categories = [...new Set(menProducts.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = menProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "price-low-high") return a.price - b.price;
      if (sortOption === "price-high-low") return b.price - a.price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0; // Default/filtered order
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

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  //random rating 
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 py-12">
     <div className="container mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
         <Man className="text-4xl text-blue-500 mr-3" />
         <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Men's Fashion Collection
          </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover premium quality clothing tailored for the modern man
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search men's products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterList className="text-gray-400" />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {sortOrder === "high-low" ? (
                <FaSortAmountUp className="text-gray-400" />
              ) : (
                <FaSortAmountDown className="text-gray-400" />
              )}
            </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="featured">Sort By</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const rating = getRandomRating();
              const isNew = Math.random() > 0.7; // 30% chance to be "new"
              const isOnSale = Math.random() > 0.8; // 20% chance to be on sale

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/*  Img with Badges */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Wishlist Btn*/}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                        wishlist.includes(product.id)
                          ? "text-red-500 bg-white/90"
                          : "text-gray-400 bg-white/80 hover:text-red-500"
                      }`}
                    >
                       {wishlist.includes(product.id) ? (
                                              <Favorite fontSize="small" />
                                            ) : (
                                              <FavoriteBorder fontSize="small" />
                                            )}
                    </button>
                    
                    {/* Badges */}
                    {isNew && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                    {isOnSale && (
                      <div className="absolute top-10 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <LocalOffer fontSize="small" className="mr-1" />
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>
                      <Chip
                        label={product.category}
                        size="small"
                        className="text-xs capitalize"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <Rating
                        value={parseFloat(rating)}
                        precision={0.5}
                        readOnly
                        size="small"
                        emptyIcon={<Star fontSize="inherit" style={{ opacity: 0.5 }} />}
                      />
                      <span className="text-xs text-gray-500 ml-1">
                        ({rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-3">
                      <CurrencyRupee fontSize="small" color="primary" />
                      <span className="text-lg font-bold text-gray-800 ml-0.5">
                        {product.price.toLocaleString()}
                      </span>
                      {isOnSale && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{(product.price * 1.2).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Btn*/}
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        fontWeight: 'bold',
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Search className="mx-auto text-4xl text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Men;
