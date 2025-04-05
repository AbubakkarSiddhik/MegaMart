import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Button, Chip, Rating, Badge, Select, MenuItem, InputAdornment, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Diamond from '@mui/icons-material/Diamond';
import {
  ShoppingCart,
  Search,
  FilterList,
  FavoriteBorder,
  Favorite,
  LocalOffer,
  Star,
  CurrencyRupee,
  Watch,
  AccessAlarm, // Alternative for watches
  Style, // For jewelry
  Checkroom // Alternative for belts
} from "@mui/icons-material";

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
  { id: 1, name: "Brown Leather Belt with Gold Buckle", price: 2499, image: a1, category: "belts" },
  { id: 2, name: "Black Leather Belt with Gold Buckle", price: 2099, image: a2, category: "belts" },
  { id: 3, name: "Brown Studded Western Belt", price: 4999, image: a3, category: "belts" },
  { id: 4, name: "Tan Perforated Leather Belt", price: 3349, image: a4, category: "belts" },
  { id: 5, name: "Dark Brown Belt with Gold Studded Buckle", price: 2949, image: a5, category: "belts" },
  { id: 6, name: "Black Leather Belt with Rhinestone Buckle", price: 7549, image: a6, category: "belts" },
  { id: 7, name: "Brown Leather Belt with Decorative Buckle", price: 3849, image: a7, category: "belts" },
  { id: 8, name: "Black and Brown Reversible Belt with Metal Buckle", price: 4199, image: a8, category: "belts" },
  { id: 9, name: "Classic Black Leather Belt with Silver Buckle", price: 2499, image: a9, category: "belts" },
  { id: 10, name: "Dark Brown Formal Belt with Silver Buckle", price: 1699, image: a10, category: "belts" },
  { id: 11, name: "Dark Brown Belt with Silver Rectangular Buckle", price: 3029, image: a11, category: "belts" },
  { id: 12, name: "Brown Leather Belt with Textured Silver Buckle", price: 3619, image: a12, category: "belts" },
  { id: 13, name: "Black Leather Belt with Wide Silver Buckle", price: 2349, image: a13, category: "belts" },
  { id: 14, name: "Black Leather Belt with Square Silver Buckle", price: 1929, image: a14, category: "belts" },
  { id: 15, name: "Two-Tone Brown Leather Belt with Gold Buckle", price: 2679, image: a15, category: "belts" },
  { id: 16, name: "Brown Leather Western Belt with Large Buckle", price: 3349, image: a16, category: "belts" },
  { id: 17, name: "Black Leather Belt with Sleek Silver Buckle", price: 2499, image: a17, category: "belts" },
  { id: 18, name: "Luxury Gold-Tone Chronograph Watch", price: 16799, image: a18, category: "watches" },
  { id: 19, name: "Classic Rose Gold Women's Watch", price: 15099, image: a19, category: "watches" },
  { id: 20, name: "Elegant Roman Numeral Rose Gold Watch", price: 15999, image: a20, category: "watches" },
  { id: 21, name: "Black and Gold Luxury Wristwatch", price: 13499, image: a21, category: "watches" },
  { id: 22, name: "Rose Gold Chronograph Watch with Diamond Bezel", price: 20999, image: a22, category: "watches" },
  { id: 23, name: "Minimalist Rose Gold Ladies Watch", price: 10999, image: a23, category: "watches" },
  { id: 24, name: "Two-Tone Rose Gold and Black Watch", price: 12599, image: a24, category: "watches" },
  { id: 25, name: "Black Leather Strap Watch with Gold Dial", price: 11799, image: a25, category: "watches" },
  { id: 26, name: "Stainless Steel Men's Watch with White Dial", price: 14299, image: a26, category: "watches" },
  { id: 27, name: "Gold and Black Chronograph Watch", price: 16799, image: a27, category: "watches" },
  { id: 28, name: "Luxury Black and Gold Wristwatch", price: 18499, image: a28, category: "watches" },
  { id: 29, name: "Vintage Black Chronograph Watch", price: 15999, image: a29, category: "watches" },
  { id: 30, name: "Luxe Gold and Black Sports Watch", price: 17599, image: a30, category: "watches" },
  { id: 31, name: "Sleek Black Chronograph Watch", price: 15099, image: a31, category: "watches" },
  { id: 32, name: "Black and Gold Luxury Sports Watch", price: 15999, image: a32, category: "watches" },
  { id: 33, name: "Black Dial Stainless Steel Watch", price: 16799, image: a33, category: "watches" },
  { id: 34, name: "Classic Black Leather Chronograph Watch", price: 14299, image: a34, category: "watches" },
  { id: 35, name: "Silver and Black Chronograph with Brown Leather Strap", price: 17599, image: a35, category: "watches" },
  { id: 36, name: "Elegant Blue Dial Leather Strap Watch", price: 13499, image: a36, category: "watches" },
  { id: 37, name: "Vintage Brown Leather Strap Watch", price: 15999, image: a37, category: "watches" },
  { id: 38, name: "Luxury Silver and Black Sports Watch", price: 18499, image: a38, category: "watches" }
];

const Accessories = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [wishlist, setWishlist] = useState([]);

  const categoryIcons = {
    belts: <Checkroom fontSize="small" />,
    watches: <Watch fontSize="small" />,
    jewelry: <Style fontSize="small" />
  };

  // Filter and sort products
  const filteredProducts = accessoriesProducts
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

  //   random rating 
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Diamond className="text-4xl text-blue-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Premium Accessories Collection
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elevate your style with our exquisite selection of accessories
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <TextField
                fullWidth
                placeholder="Search accessories..."
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
                {[...new Set(accessoriesProducts.map(p => p.category))].map((category) => (
                  <MenuItem key={category} value={category}>
                    <div className="flex items-center">
                      {categoryIcons[category] || <Diamond fontSize="small" />}
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
                  {/* Badges */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Wishlist Btn */}
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
                        icon={categoryIcons[product.category] || <Diamond fontSize="small" />}
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

                    {/* Add to Cart Btn */}
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        fontWeight: 'bold',
                        py: 1,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
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
              No accessories found
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

export default Accessories;
