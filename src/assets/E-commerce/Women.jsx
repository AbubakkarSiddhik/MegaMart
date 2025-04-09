import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button, Chip, Rating, Badge, Select, MenuItem, InputAdornment, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ShoppingCart,
  Search,
  FilterList,
  FavoriteBorder,
  Favorite,
  LocalOffer,
  Star,
  CurrencyRupee,
  Woman
} from "@mui/icons-material";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
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
  { id: 1, name: "Red Dupatta Suit", price: "4,149", image: w1, category: "ethnic" },
  { id: 2, name: "Green Salwar Kameez", price: "4,564", image: w2, category: "ethnic" },
  { id: 3, name: "Floral Anarkali Dress", price: "4,979", image: w3, category: "ethnic" },
  { id: 4, name: "Beige Dupatta Set", price: "3,734", image: w4, category: "ethnic" },
  { id: 5, name: "Yellow Suit", price: "3,319", image: w5, category: "ethnic" },
  { id: 6, name: "White Ethnic Gown", price: "5,404", image: w6, category: "gowns" },
  { id: 7, name: "Golden & Brown Lehenga", price: "6,639", image: w7, category: "lehengas" },
  { id: 8, name: "Blue & Gold Silk Saree", price: "5,809", image: w8, category: "sarees" },
  { id: 9, name: "Lavender Flowy Gown", price: "6,224", image: w9, category: "gowns" },
  { id: 10, name: "Lilac Net Lehenga", price: "7,469", image: w10, category: "lehengas" },
  { id: 11, name: "Traditional Green Saree", price: "5,477", image: w11, category: "sarees" },
  { id: 12, name: "Western White Long Dress", price: "4,647", image: w12, category: "western" },
  { id: 13, name: "Floral Printed Pink Dress", price: "3,817", image: w13, category: "western" },
  { id: 14, name: "Purple Pleated Dress", price: "4,149", image: w14, category: "western" },
  { id: 15, name: "Casual Denim Jacket Outfit", price: "4,979", image: w15, category: "western" },
  { id: 16, name: "Red Evening Dress", price: "4,149", image: w16, category: "western" },
  { id: 17, name: "Black Floral Midi Dress", price: "4,564", image: w17, category: "western" },
  { id: 18, name: "Red Designer Dress", price: "4,979", image: w18, category: "western" },
  { id: 19, name: "Brown Elegant Jumpsuit", price: "3,734", image: w19, category: "western" },
  { id: 20, name: "Blue Ballroom Gown", price: "7,469", image: w20, category: "gowns" },
  { id: 21, name: "Sparkly Blue Party Dress", price: "6,639", image: w21, category: "western" },
  { id: 22, name: "White Wedding Gown", price: "16,599", image: w22, category: "wedding" },
  { id: 23, name: "Pink Embroidered Gown", price: "10,789", image: w23, category: "gowns" },
  { id: 24, name: "Turquoise Flowy Dress", price: "8,299", image: w24, category: "western" },
  { id: 25, name: "Red Traditional Saree", price: "5,809", image: w25, category: "sarees" },
  { id: 26, name: "Pink & Purple Saree", price: "5,404", image: w26, category: "sarees" },
  { id: 27, name: "Grey & Blue Border Saree", price: "6,224", image: w27, category: "sarees" },
  { id: 28, name: "Purple Silk Saree", price: "6,639", image: w28, category: "sarees" },
  { id: 29, name: "Golden Yellow Saree", price: "5,809", image: w29, category: "sarees" },
  { id: 30, name: "Beige & Red Border Saree", price: "4,979", image: w30, category: "sarees" },
  { id: 31, name: "Maroon & Gold Saree", price: "5,404", image: w31, category: "sarees" },
  { id: 32, name: "Pink & Green Traditional Saree", price: "6,224", image: w32, category: "sarees" },
  { id: 33, name: "Red & Gold Banarasi Saree", price: "6,639", image: w33, category: "sarees" },
  { id: 34, name: "Dark Green & Red Saree", price: "5,809", image: w34, category: "sarees" },
  { id: 35, name: "Orange & Gold Designer Saree", price: "7,054", image: w35, category: "sarees" },
  { id: 36, name: "Golden Brown Kanjivaram Saree", price: "7,469", image: w36, category: "sarees" },
  { id: 37, name: "Green & Pink Embroidered Saree", price: "6,639", image: w37, category: "sarees" },
  { id: 38, name: "Brown & Black Ethnic Saree", price: "6,058", image: w38, category: "sarees" },
  { id: 39, name: "Peach & Orange Designer Saree", price: "6,473", image: w39, category: "sarees" },
  { id: 40, name: "Olive Green Silk Saree", price: "5,809", image: w40, category: "sarees" },
  { id: 41, name: "Royal Blue & Gold Saree", price: "7,469", image: w41, category: "sarees" },
  { id: 42, name: "Navy Blue & Red Saree", price: "7,054", image: w42, category: "sarees" },
  { id: 43, name: "Black & Gold Traditional Saree", price: "6,639", image: w43, category: "sarees" },
  { id: 44, name: "Pink & Golden Silk Saree", price: "7,469", image: w44, category: "sarees" },
  { id: 45, name: "Dual-Tone Saree Combo", price: "8,299", image: w45, category: "sarees" }
];

const Women = () => {
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");

  // Unique categories
  const categories = [...new Set(womenProducts.map(product => product.category))];

  // Filtering & sorting products
  const filteredProducts = womenProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "price-low-high") return parseFloat(a.price.replace(/,/g, '')) - parseFloat(b.price.replace(/,/g, ''));
      if (sortOption === "price-high-low") return parseFloat(b.price.replace(/,/g, '')) - parseFloat(a.price.replace(/,/g, ''));
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

  // Random rating 
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Woman className="text-4xl text-pink-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Women's Fashion Collection
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover elegant and trendy outfits for every occasion
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
                placeholder="Search women's products..."
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
                <option value="all">All</option>
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
                {sortOption === "price-high-low" ? (
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
                <option value="">Sort By</option>
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
              const isNew = Math.random() > 0.7;
              const isOnSale = Math.random() > 0.8;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image with Badges */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                        wishlist.some(item => item.id === product.id)
                          ? "text-red-500 bg-white/90"
                          : "text-gray-400 bg-white/80 hover:text-red-500"
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
                        {product.price}
                      </span>
                      {isOnSale && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{(parseFloat(product.price.replace(/,/g, '')) * 1.2).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        fontWeight: 'bold',
                        py: 1,
                        backgroundColor: 'pink.500',
                        '&:hover': {
                          backgroundColor: 'pink.600',
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

export default Women;
