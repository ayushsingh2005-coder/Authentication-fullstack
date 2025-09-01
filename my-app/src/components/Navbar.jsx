import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";

// SVG Icon for the logo
const LogoIcon = () => (
  <svg
    className="h-8 w-8 text-indigo-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
    />
  </svg>
);

// SVG Icon for search
const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

// SVG Icon for theme toggle
const ThemeIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    ></path>
  </svg>
);

// SVG Icon for mobile menu
const MobileMenuIcon = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const Navbars = () => {
  const navigate = useNavigate();

  // State management
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileLoading, setProfileLoading] = useState(false);
  const [isLogoutLoading, setLogoutLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [profileLetter, setProfileLetter] = useState("?");

  // Ref for the profile dropdown to detect clicks outside
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef]);

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // Helper function to handle authentication errors
  const handleAuthError = (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - token expired or invalid");
      // Clear invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login
      navigate("/login");
      return true; // Indicates auth error was handled
    }
    return false; // Not an auth error
  };

  const handleProfileClick = async (e) => {
    e.preventDefault();
    console.log("Profile button clicked - fetching profile data...");

    setProfileLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: getAuthHeaders(),
        }
      );

      console.log("✅ Profile data fetched successfully:", response.data);

      // Store profile data for use in profile page
      setUserProfile(response.data.user);

      // Navigate to profile page
      navigate("/profile", {
        state: { userData: response.data.user }, // Pass data to profile page
      });

      // Close the dropdown after successful action
      setProfileOpen(false);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);

      // Handle authentication errors
      if (handleAuthError(error)) {
        return; // Auth error handled, exit function
      }

      // Handle other errors
      if (error.response?.status === 404) {
        console.log("Profile not found");
        alert("Profile not found. Please contact support.");
      } else {
        console.log("Error fetching profile data");
        alert("Failed to load profile. Please try again.");
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    console.log("🚀 Logout button clicked - starting logout process...");

    setLogoutLoading(true);

    try {
      // STEP 1: Call logout API to invalidate token on server
      console.log("📡 Making logout API call...");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {}, // Empty body
        {
          headers: getAuthHeaders(),
        }
      );

      console.log("✅ Logout API call successful:", response.data);
    } catch (error) {
      console.error("⚠️ Logout API call failed:", error);
      // Continue with client-side logout even if API fails
      console.log("Continuing with client-side logout...");
    }

    // STEP 2: Clear all authentication data from localStorage
    console.log("🗑️ Clearing authentication data from localStorage...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken"); // If you use refresh tokens

    // STEP 3: Clear any user state
    setUserProfile(null);

    // STEP 4: Close dropdown and navigate to login
    setProfileOpen(false);
    console.log("🏠 Redirecting to login page...");
    navigate("/auth");

    // STEP 5: Show success message
    console.log("✅ Logout completed successfully!");

    // Set loading to false after a short delay to show the loading state
    setTimeout(() => {
      setLogoutLoading(false);
    }, 500);
  };

  const handleHomeClick = () => {
    console.log("Navigating to home page");
    navigate("/dashboard");
  };

  const handleMyArticlesClick = () => {
    console.log("Navigating to my articles page");
    navigate("/post/create");
  };

  const handleStartWriting = () => {
    navigate("/post/create");
  };

  const handleThemeToggle = () => {
    console.log("Theme toggle clicked");
    // TODO: Implement theme switching
    // Example: setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const searchQuery = e.target.value;
      console.log("Search query:", searchQuery);
      // TODO: Implement search functionality
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // extracting the user data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    // console.log(storedData)
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        setUser(userData);

        // Extract first letter of firstname OR fallback to email
        const letter =
          userData?.fullname?.firstname?.trim().charAt(0).toUpperCase() ||
          userData?.email?.trim().charAt(0).toUpperCase() ||
          "?";

        setProfileLetter(letter);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  return (
    <nav className="bg-[#111827] text-white shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT SECTION: Logo */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleHomeClick}
            >
              <FontAwesomeIcon
                icon={faHexagonNodes}
                size="2x"
                className="mr-2 text-purple-600"
              />
              <span className="text-2xl font-bold text-white">Omnia</span>
            </div>
          </div>

          {/* MIDDLE SECTION: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8 lg:px-16">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                onSubmit={handleSearchSubmit}
                className="search-input bg-[#1F2937] border-none text-white placeholder-gray-400 text-base rounded-lg 
focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5 
transition duration-300 ease-in-out focus:outline-none"
              />
            </div>
          </div>

          {/* RIGHT SECTION: Navigation Links and Profile */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Home Link */}
            <button
              onClick={handleHomeClick}
              className="text-lg text-gray-300 hover:text-purple-500 transition duration-150 ease-in-out cursor-pointer"
            >
              Home
            </button>

            {/* My Articles Link */}
            <button
              onClick={handleMyArticlesClick}
              className="text-lg text-gray-300 hover:text-purple-500 transition duration-150 ease-in-out cursor-pointer"
            >
              My Articles
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className="text-gray-300 hover:text-white transition duration-150 ease-in-out"
            >
              <ThemeIcon />
            </button>

            {/* PROFILE DROPDOWN */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex cursor-pointer items-center justify-center h-10 w-10 bg-purple-700 hover:bg-purple-600 rounded-full text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors"
              >
                {profileLetter}
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#1F2937] ring-1 ring-black ring-opacity-5 z-50">
                  {/* PROFILE BUTTON */}
                  <button
                    onClick={handleProfileClick}
                    disabled={isProfileLoading}
                    className="flex cursor-pointer items-center w-full text-left px-4 py-2 rounded text-base text-white hover:bg-purple-500 transition-colors"
                  >
                    <span>
                      {isProfileLoading
                        ? "🔄 Loading Profile..."
                        : "👤 Profile"}
                    </span>
                  </button>

                  {/* LOGOUT BUTTON - PROPERLY CONNECTED */}
                  <button
                    onClick={handleLogoutClick}
                    disabled={isLogoutLoading}
                    className="flex cursor-pointer items-center w-full text-left px-4 py-2 rounded text-base text-white hover:bg-purple-500  transition-colors"
                  >
                    <span>
                      {isLogoutLoading ? "🔄 Logging out..." : "🚪 Logout"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <MobileMenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Navigation Links */}
            <button
              onClick={() => {
                handleHomeClick();
                setMobileMenuOpen(false);
              }}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => {
                handleMyArticlesClick();
                setMobileMenuOpen(false);
              }}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            >
              My Articles
            </button>

            <button
              onClick={() => {
                handleCreatePostClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-300 ease-in-out"
            >
              Create Post
            </button>

            {/* Mobile Profile and Logout Options */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <button
                onClick={() => {
                  handleProfileClick();
                  setMobileMenuOpen(false);
                }}
                disabled={isProfileLoading}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left disabled:opacity-50 transition-colors"
              >
                {isProfileLoading ? "🔄 Loading Profile..." : "👤 Profile"}
              </button>

              <button
                onClick={() => {
                  handleLogoutClick();
                  setMobileMenuOpen(false);
                }}
                disabled={isLogoutLoading}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left disabled:opacity-50 transition-colors"
              >
                {isLogoutLoading ? "🔄 Logging out..." : "🚪 Logout"}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="px-2 pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                onKeyPress={handleSearchSubmit}
                className="bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 transition duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default function Navbar() {
  return <Navbars />;
}
