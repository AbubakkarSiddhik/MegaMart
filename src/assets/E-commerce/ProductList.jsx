import { useState } from "react";
import { useCart } from "./CartContext";
import { products } from "./products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaShoppingCart, FaFilter, FaSortAmountDown, FaSortAmountUp, FaRupeeSign, FaStar, FaRegStar } from "react-icons/fa";
import { GiClothes, GiRunningShoe, GiNecklace } from "react-icons/gi";
import { IoShirtSharp } from "react-icons/io5";
import { MdDiscount, MdCategory } from "react-icons/md";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  // Category icons mapping
  const categoryIcons = {
    All: <MdCategory className="mr-2" />,
    Men: <IoShirtSharp className="mr-2" />,
    Women: <GiClothes className="mr-2" />,
    Shoes: <GiRunningShoe className="mr-2" />,
    Accessories: <GiNecklace className="mr-2" />
  };

  const filteredByCategory =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const filteredBySearch = filteredByCategory.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredBySearch].sort((a, b) => {
    if (sortOrder === "low-high") return a.price - b.price;
    if (sortOrder === "high-low") return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      icon: <FaShoppingCart />,
      theme: "colored"
    });
  };

  //  random rating 
  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); 
  };

  return (
    <section className="px-4 py-12 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Discover Our Collection
        </h2>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-1/4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 w-full appearance-none border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
            >
              {Object.keys(categoryIcons).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="relative w-full md:w-1/4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {sortOrder === "high-low" ? (
                <FaSortAmountUp className="text-gray-400" />
              ) : (
                <FaSortAmountDown className="text-gray-400" />
              )}
            </div>
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="pl-10 pr-4 py-2 w-full appearance-none border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortOrder}
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => {
              const rating = getRandomRating();
              const isNew = Math.random() > 0.7; // 30% chance to be "new"
              const isOnSale = Math.random() > 0.8; // 20% chance to be on sale

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Image with Badges */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {isNew && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                    {isOnSale && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <MdDiscount className="mr-1" />
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(rating) ? 
                            <FaStar key={i} className="text-sm" /> : 
                            <FaRegStar key={i} className="text-sm" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-3">
                      <FaRupeeSign className="text-gray-600 mr-1" />
                      <span className="text-lg font-bold text-gray-800">
                        {product.price.toLocaleString()}
                      </span>
                      {isOnSale && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{(product.price * 1.2).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default ProductList;
