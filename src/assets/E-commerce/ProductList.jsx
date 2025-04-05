import { useState } from "react";
import { useCart } from "./CartContext";
import { products } from "./products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const { addToCart } = useCart();

  
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
    });
  };

  return (
    <section className="px-6 py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 className="text-3xl font-bold text-center mb-6">Shop Our Products</h2>

   
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

       
        <input
          type="text"
          placeholder="Search for products..."
          className="p-2 border border-gray-600 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 font-bold">₹{product.price}</p>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>

      
      <ToastContainer />
    </section>
  );
};

export default ProductList;
