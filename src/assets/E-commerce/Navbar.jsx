import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { Menu, Close, ShoppingCart, AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import Logo from "./Logo.png";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         
          <img
            src={Logo}
            alt="MegaMart Logo"
            className="h-15 w-auto rounded-lg"
          />

          

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-black hover:text-blue-500">
              Home
            </Link>
            <Link to="/shop" className="text-black hover:text-blue-500">
              Shop
            </Link>
            <Link to="/reviews" className="text-black hover:text-blue-500">
              Reviews
            </Link>
            <Link to="/contact" className="text-black hover:text-blue-500">
              Contact
            </Link>
           
          </div>

         
          <div className="flex items-center space-x-4 md:pl-5">
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart
                className="text-black hover:text-blue-500"
                fontSize="large"
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/account">
              <AccountCircle
                className="text-black hover:text-blue-500 cursor-pointer"
                fontSize="large"
              />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black hover:text-blue-500 focus:outline-none"
            >
              {menuOpen ? <Close fontSize="large" /> : <Menu fontSize="large" />}
            </button>
          </div>
        </div>

     
        <div
          className={`md:hidden bg-white transition-all duration-300 ${
            menuOpen ? "max-h-60 py-2" : "max-h-0 overflow-hidden"
          }`}
        >
          {/* <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-600 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
          <div className="flex flex-col items-center p-4 space-y-5">
            <Link to="/" className="text-black hover:text-blue-500">
              Home
            </Link>
            <Link to="/shop" className="text-black hover:text-blue-500">
              Shop
            </Link>
            <Link to="/reviews" className="text-black hover:text-blue-500">
              Reviews
            </Link>
            <Link to="/contact" className="text-black hover:text-blue-500">
              Contact
            </Link>
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
