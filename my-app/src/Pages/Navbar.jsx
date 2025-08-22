import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-18 flex items-center justify-between px-4 text-white bg-gray-800">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faHexagonNodes} size="3x" className="mr-2 text-blue-600" />
        <p className="text-gray-200 text-2xl font-medium">Omnia</p>
      </div>

      {/* Search box */}
      <div className="h-10 border border-gray-400 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white h-10 px-3 w-32 sm:w-48 md:w-64 
                     focus:outline-none focus:ring-0"
        />
        <Link to="/Search" className="px-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
