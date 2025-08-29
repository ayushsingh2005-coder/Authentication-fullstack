// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <span className="text-white text-xl">🪶</span>
            </div>
            <h2 className="text-lg font-bold text-white">Devnovate</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            A modern blogging platform for developers to share knowledge, insights, 
            and innovations. Join our community of tech enthusiasts and thought leaders.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-white" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-white" />
            </a>
            <a href="mailto:example@email.com">
              <FaEnvelope className="hover:text-white" />
            </a>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            <li><Link to="/trending" className="hover:text-white">Trending</Link></li>
            <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link to="/write" className="hover:text-white">Write</Link></li>
            <li><Link to="/authors" className="hover:text-white">Authors</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link to="/guidelines" className="hover:text-white">Writing Guidelines</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2025 Devnovate. All rights reserved. Built for VIBE HACK 2025.</p>
        <div className="mt-3 md:mt-0">
          <button className="bg-white text-black px-3 py-1 rounded-md flex items-center gap-1">
            <span className="font-bold">b</span> Made in Bolt
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
