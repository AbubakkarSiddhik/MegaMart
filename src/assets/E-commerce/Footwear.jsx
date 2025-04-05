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
  DirectionsRun,
  Checkroom,
  SportsSoccer,
  MilitaryTech
} from "@mui/icons-material";
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
  const [sortOption, setSortOption] = useState("featured");
  const [wishlist, setWishlist] = useState([]);

  // Category icons mapping
  const categoryIcons = {
    casual: <DirectionsRun fontSize="small" />,
    loafers: <Checkroom fontSize="small" />,
    sneakers: <SportsSoccer fontSize="small" />,
    boots: <MilitaryTech fontSize="small" />,
    formal: <Checkroom fontSize="small" />,
    heels: <Checkroom fontSize="small" />
  };

  // Filtering and sorting products
  const filteredProducts = footwearProducts
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
      return 0;
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

  // random rating 
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <SportsSoccer className="text-4xl text-amber-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Premium Footwear Collection
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Step out in style with our exquisite range of footwear
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <TextField
                fullWidth
                placeholder="Search footwear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="relative w-full md:w-64">
              <Select
                fullWidth
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList className="text-gray-400" />
                  </InputAdornment>
                }
                displayEmpty
              >
                <MenuItem value="all">All Categories</MenuItem>
                {[...new Set(footwearProducts.map(p => p.category))].map((category) => (
                  <MenuItem key={category} value={category}>
                    <div className="flex items-center">
                      {categoryIcons[category] || <DirectionsRun fontSize="small" />}
                      <span className="ml-2">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>

            {/* Sort Filter */}
            <div className="relative w-full md:w-64">
              <Select
                fullWidth
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                displayEmpty
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                <MenuItem value="name-asc">Name: A-Z</MenuItem>
                <MenuItem value="name-desc">Name: Z-A</MenuItem>
              </Select>
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
                  {/* with Badges */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Wishlist Button */}
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
                        icon={categoryIcons[product.category] || <DirectionsRun fontSize="small" />}
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
                        backgroundColor: 'amber.500',
                        '&:hover': {
                          backgroundColor: 'amber.600',
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
              No footwear found
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

export default Footwear;
