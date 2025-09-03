// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
                icon={faHexagonNodes}
                size="2x"
                className="mr-2 text-purple-600"
              />
            <h2 className="text-lg font-bold text-white">Omnia</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            A modern blogging platform for developers to share knowledge,
            insights, and innovations. Join our community of tech enthusiasts
            and thought leaders.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://github.com/pathwaycom/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="hover:text-purple-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-purple-600" />
            </a>
            <a
              href="https://www.linkedin.com/company/hackwithindia/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="hover:text-purple-600" />
            </a>
            <a href="mailto:omnia.pvt.ltd@gmail.com">
              <FaEnvelope className="hover:text-purple-600" />
            </a>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/categories" className="hover:text-purple-600">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/write" className="hover:text-purple-600">
                Write
              </Link>
            </li>
            <li>
              <Link to="/authors" className="hover:text-purple-600">
                Authors
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className="hover:text-purple-600">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/guidelines" className="hover:text-purple-600">
                Writing Guidelines
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-purple-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-purple-600">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-600 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-gray-400">© 2025 Omnia. All rights reserved..</p>
        <div className="mt-3 md:mt-0"></div>
      </div>
    </footer>
  );
};

export default Footer;
