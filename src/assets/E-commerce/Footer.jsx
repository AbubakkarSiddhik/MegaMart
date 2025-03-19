import React from "react";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
         
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-blue-400 transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-blue-400 transition-colors">
                  Cart
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: support@megamart.com</li>
              <li>Phone: +919876543210</li>
              <li>Address: 123 MegaMart St, City, Country</li>
            </ul>
          </div>

      
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Facebook fontSize="large" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Twitter fontSize="large" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <Instagram fontSize="large" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <LinkedIn fontSize="large" />
              </a>
            </div>
          </div>
        </div>

       
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2025 MegaMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;