import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import {
  Person,
  Edit,
  Menu,
  Close,
  Assignment,
  ShoppingCart,
  AccountCircle,
  GetApp,
  Favorite,
  ExitToApp,
} from "@mui/icons-material";
import { FiLogIn } from "react-icons/fi";
import { Avatar } from "@mui/material";
import { useState, useContext, useEffect, useRef } from "react";
import { AiFillApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import Logo from "./Logo.png";
import { AuthContext } from "./AuthContext";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { cart, wishlist } = useCart();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/account");
    setProfileDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 p-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img
            src={Logo}
            alt="MegaMart Logo"
            className="h-15 w-auto rounded-lg"
          />

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6 font-semibold text-lg">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-black hover:text-blue-500"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-black hover:text-blue-500"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-black hover:text-blue-500"
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-black hover:text-blue-500"
                }
              >
                Reviews
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-black hover:text-blue-500"
                }
              >
                Contact
              </NavLink>
            </div>
            <div
              className="relative"
              onMouseEnter={() => setAppDropdownOpen(true)}
              onMouseLeave={() => setAppDropdownOpen(false)}
            >
              <button className="flex items-center text-black hover:text-blue-500 ml-4">
                <GetApp fontSize="medium" className="mr-1" />
                <span className="text-sm font-medium">Get App</span>
              </button>
              {appDropdownOpen && (
                <div className="absolute left-0 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <FaGooglePlay className="text-green-500 text-xl mr-2" />
                    <span>Google Play</span>
                  </a>
                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <AiFillApple className="text-pink-500 text-xl mr-2" />
                    <span>App Store</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink to="/cart" className="relative cursor-pointer">
              <ShoppingCart
                className="text-black hover:text-blue-500"
                fontSize="large"
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </NavLink>

            <NavLink to="/wishlist" className="relative cursor-pointer">
              <Favorite
                className="text-black hover:text-red-500"
                fontSize="large"
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </NavLink>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center text-black hover:text-blue-500 cursor-pointer"
              >
                <AccountCircle fontSize="large" className="text-gray-700 hover:text-blue-600 transition-colors" />
                {user && (
                  <span className="ml-1 text-sm font-medium hidden md:inline">
                    {user.name?.split(" ")[0] || "Account"}
                  </span>
                )}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 min-w-50 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <Avatar
                            src={user.profilePic}
                            className="w-10 h-10 mr-3"
                            sx={{ bgcolor: '#6366f1' }}
                          >
                            {user.name?.charAt(0) || "U"}
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {user.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        {user.email === "owner@gmail.com" && (
                          <NavLink
                            to="/owner-dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            
                            <Assignment className="mr-3 text-gray-400" fontSize="small" />
                            Dashboard
                          </NavLink>
                        )}
                        <NavLink
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Person className="mr-3 text-gray-400" fontSize="small" />
                          View Profile
                        </NavLink>
                        <NavLink
                          to="/profile/editprofilepage"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit className="mr-3 text-gray-400" fontSize="small" />
                          Edit Profile
                        </NavLink>
                        <NavLink
                          to="/profile/orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <ShoppingCart className="mr-3 text-gray-400" fontSize="small" />
                          My Orders
                        </NavLink>
                      </div>

                      <div className="py-1 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <ExitToApp className="mr-3 text-red-400" fontSize="small" />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">Welcome to MegaMart</p>
                      <p className="text-xs text-gray-500 mb-3">
                        Sign in to access your account and manage orders
                      </p>
                      <NavLink
                        to="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-md hover:shadow-md transition-all"
                      >
                        <FiLogIn className="mr-2" />
                        LOGIN / SIGNUP
                      </NavLink>
                    </div>
                  )}
                </div>
              )}
            </div>
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
          className={`md:hidden bg-white transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"
            } overflow-hidden`}
        >
          <div className="flex flex-col items-center p-4 space-y-5 font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black hover:text-blue-500"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black hover:text-blue-500"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black hover:text-blue-500"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/reviews"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black hover:text-blue-500"
              }
            >
              Reviews
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black hover:text-blue-500"
              }
            >
              Contact
            </NavLink>
            {user && (
              <>
                {/* <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-black hover:text-blue-500"
                  }
                >
                  Profile
                </NavLink>
                {user.email === "owner@gmail.com" && (
                  <NavLink
                    to="/owner-dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-black hover:text-blue-500"
                    }
                  >
                    Dashboard
                  </NavLink>
                )} */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center text-black hover:text-blue-500"
                >
                  <AccountCircle fontSize="medium" className="mr-1" />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!user && (
              <NavLink
                to="/account"
                className="flex items-center justify-center text-black hover:text-blue-500"
              >
                <AccountCircle fontSize="medium" className="mr-1" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
