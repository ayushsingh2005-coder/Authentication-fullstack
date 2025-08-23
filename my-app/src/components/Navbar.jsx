import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHexagonNodes,
  faBars, // ✅ Hamburger icon
  faXmark,
  faUser,

  // ✅ Close icon
} from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  // ✅ STATE MANAGEMENT: Controls whether sidebar is open (true) or closed (false)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ TOGGLE FUNCTION: Flips the sidebar state between open/closed
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // If true becomes false, if false becomes true
  };

  return (
    <>
      {/* ✅ MAIN NAVBAR CONTAINER */}
      <div className="w-full bg-gray-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* ✅ LEFT SECTION: Hamburger + Logo + Brand */}
          <div className="flex items-center space-x-4">
            {/* 🍔 HAMBURGER MENU BUTTON - This was missing in your original code! */}
            <button
              onClick={toggleSidebar} // ✅ Triggers the toggle function when clicked
              className="text-white hover:text-blue-400 transition-colors duration-200"
              aria-label="Toggle sidebar menu"
            >
              <FontAwesomeIcon
                icon={sidebarOpen ? faXmark : faBars} // ✅ Shows X when open, hamburger when closed
                className="text-xl"
              />
            </button>

            {/* ✅ LOGO ICON */}
            <FontAwesomeIcon
              icon={faHexagonNodes}
              className="text-blue-600"
              style={{ fontSize: "2rem" }} // Inline styling for icon size
            />

            {/* ✅ BRAND NAME with routing */}
            <Link
              to="/dashboard"
              className="text-white font-semibold"
              style={{ fontSize: "1.5rem" }}
            >
              Omnia
            </Link>
          </div>

          {/* ✅ CENTER SECTION: Search Box */}
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search your AI models..."
              className="w-full bg-gray-900 
                px-3 
                py-1 
                rounded-md 
                border-1 
                border-gray-400 
                focus:border-blue-500 
                text-gray-200 
                focus:ring-2 
                focus:ring-blue-600 
                transition 
                duration-300 
                ease-in-out
                outline-none"
            />
          </div>
          
        </div>
      </div>

      {/* ✅ SIDEBAR PANEL - Slides in from left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-20
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        // ☝️ ANIMATION LOGIC: translate-x-0 = visible, -translate-x-full = hidden off-screen
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-blue-600 font-bold text-3xl">
              <FontAwesomeIcon icon={faHexagonNodes} />
            </h2>
            {/* ✅ Close button inside sidebar */}
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <ul className="p-2  space-y-2">
          <button className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors ">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            New Chat
          </button>

          <button className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors ">
            <FontAwesomeIcon icon={faGear} className="mr-2" />
            Settings
          </button>

          <button className="w-full flex items-center py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors ">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </button>
        </ul>

        {/* chat section */}
            <div className="mt-3">
                <ul className="p-2  space-y-2">
                    <li className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors">hiiii</li>
                    <li className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors">hiiii</li>
                    <li className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors">hiiii</li>
                    <li className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors">hiiii</li>
                    <li className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors">hiiii</li>
                    <li className="w-full flex items-center space-x-2  py-2 px-4 hover:bg-gray-700 rounded cursor-pointer text-gray-300 hover:text-white transition-colors">hiiii</li>
                    
                </ul>
            </div>

      </div>

      {/* ✅ BACKDROP OVERLAY - Appears when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar} // 
        />
      )}
    </>
  );
};

export default Navbar;
