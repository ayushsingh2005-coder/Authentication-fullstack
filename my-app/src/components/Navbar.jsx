import React, { useState, useEffect, useRef } from 'react';

// SVG Icon for the logo
const LogoIcon = () => (
    <svg className="h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);

// SVG Icon for search
const SearchIcon = () => (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

// SVG Icon for theme toggle
const ThemeIcon = () => (
     <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
);

// SVG Icon for mobile menu
const MobileMenuIcon = () => (
    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const Navbars = () => {
    // State to manage the visibility of the profile dropdown
    const [isProfileOpen, setProfileOpen] = useState(false);
    // State to manage the visibility of the mobile menu
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Ref for the profile dropdown to detect clicks outside
    const profileDropdownRef = useRef(null);

    // This effect handles closing the profile dropdown when a click occurs outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileDropdownRef]);

    // --- API Call Handlers ---
    // You can replace these console.log statements with your actual API calls
    const handleProfileClick = () => console.log('API Call: Fetch Profile Data');
    const handleTemplatesClick = () => console.log('API Call: Fetch Post Templates');
    const handleLogoutClick = () => console.log('API Call: Logout User');


    return (
        <nav className="bg-[#111827] text-white shadow-lg">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left Section: Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <LogoIcon />
                            <span className="text-2xl font-bold text-white">Devnovate</span>
                        </div>
                    </div>

                    {/* Middle Section: Search Bar */}
                    <div className="hidden md:flex flex-1 justify-center px-8 lg:px-16">
                        <div className="relative w-full max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input type="text" placeholder="Search articles..." className="search-input bg-[#1F2937] border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 transition duration-300 ease-in-out" />
                        </div>
                    </div>

                    {/* Right Section: Links, Button, and Profile */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">Home</a>
                        <a href="#" className="text-gray-300 hover:text-white transition duration-150 ease-in-out">My Articles</a>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">Create Post</button>
                        <button className="text-gray-300 hover:text-white">
                           <ThemeIcon />
                        </button>
                        
                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileDropdownRef}>
                            <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center justify-center h-10 w-10 bg-gray-600 rounded-full text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                U
                            </button>
                            {isProfileOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#1F2937] ring-1 ring-black ring-opacity-5">
                                    <a href="#" onClick={handleProfileClick} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Profile</a>
                                    <a href="#" onClick={handleTemplatesClick} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">My post templates</a>
                                    <a href="#" onClick={handleLogoutClick} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Logout</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <MobileMenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu, show/hide based on menu state. */}
            {isMobileMenuOpen && (
                 <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My Articles</a>
                        <button className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-300 ease-in-out">Create Post</button>
                    </div>
                </div>
            )}
        </nav>
    );
};


export default function Navbar() {
  return (
       <Navbars />
   
  )
}
