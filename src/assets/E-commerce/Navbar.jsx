import { NavLink } from "react-router-dom";
import { useCart } from "./CartContext";
import { Menu, Close, ShoppingCart, AccountCircle, GetApp } from "@mui/icons-material";
import { useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import Logo from "./Logo.png";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 p-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img src={Logo} alt="MegaMart Logo" className="h-15 w-auto rounded-lg" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6 font-semibold text-lg">
              <NavLink to="/" className={({ isActive }) => 
                isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
              }>
                Home
              </NavLink>

              <NavLink to="/about" className={({ isActive }) => 
                isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
              }>
                About
              </NavLink>

              <NavLink to="/shop" className={({ isActive }) => 
                isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
              }>
                Shop
              </NavLink>

              <NavLink to="/reviews" className={({ isActive }) => 
                isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
              }>
                Reviews
              </NavLink>

              <NavLink to="/contact" className={({ isActive }) => 
                isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
              }>
                Contact
              </NavLink>
            </div>

            {/* Download App Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAppDropdownOpen(true)}
              onMouseLeave={() => setAppDropdownOpen(false)}
            >
              <button className="flex items-center text-black hover:text-blue-500 ml-4">
                <GetApp fontSize="medium" className="mr-1" />
                <span className="text-sm font-medium">Download App</span>
              </button>
              
              {appDropdownOpen && (
                <div className="absolute left-0 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a href="https://play.google.com/store" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <FaGooglePlay className="text-green-500 text-xl mr-2" />
                    <span>Google Play</span>
                  </a>
                  <a href="https://www.apple.com/app-store/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <AiFillApple className="text-pink-500 text-xl mr-2" />
                    <span>App Store</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Cart & Account */}
          <div className="flex items-center space-x-4">
            <NavLink to="/cart" className="relative cursor-pointer">
              <ShoppingCart className="text-black hover:text-blue-500" fontSize="large" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </NavLink>

            <NavLink to="/account">
              <AccountCircle className="text-black hover:text-blue-500 cursor-pointer" fontSize="large" />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-black hover:text-blue-500 focus:outline-none">
              {menuOpen ? <Close fontSize="large" /> : <Menu fontSize="large" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"} overflow-hidden`}>
          <div className="flex flex-col items-center p-4 space-y-5 font-semibold">
            <NavLink to="/" className={({ isActive }) => 
              isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
            }>
              Home
            </NavLink>
            
            <NavLink to="/about" className={({ isActive }) => 
              isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
            }>
              About
            </NavLink>

            <NavLink to="/shop" className={({ isActive }) => 
              isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
            }>
              Shop
            </NavLink>

            <NavLink to="/reviews" className={({ isActive }) => 
              isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
            }>
              Reviews
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => 
              isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-black hover:text-blue-500"
            }>
              Contact
            </NavLink>

            {/* Download App Dropdown - Mobile */}
            <div className="w-full text-center">
              <button className="flex items-center justify-center w-full text-black hover:text-blue-500"
                      onClick={() => setAppDropdownOpen(!appDropdownOpen)}>
                <GetApp fontSize="medium" className="mr-1" />
                <span>Download App</span>
              </button>
              
              {appDropdownOpen && (
                <div className="mt-2 space-y-3">
                  <a href="https://play.google.com/store" target="_blank" 
                     rel="noopener noreferrer" className="flex items-center justify-center text-black hover:text-blue-500">
                    <FaGooglePlay className="text-green-500 text-2xl mr-2" />
                    <span>Google Play</span>
                  </a>
                  <a href="https://www.apple.com/app-store/" target="_blank" 
                     rel="noopener noreferrer" className="flex items-center justify-center text-black hover:text-blue-500">
                    <AiFillApple className="text-pink-600  text-2xl mr-2" />
                    <span>App Store</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
