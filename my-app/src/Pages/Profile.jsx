import React, { useState, useEffect } from "react";
import { User, Mail, Edit3, Save, X } from "lucide-react";
import axios from "axios";

export default function Profile() {
  // State for storing user data from API
  const [user, setUser] = useState(null);
  
  // State for storing profile information displayed on the page
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    about: "",
  });

  // State for controlling the edit modal visibility
  const [isEditing, setIsEditing] = useState(false);
  
  // State for storing form data while editing
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    about: "",
  });

  // State for managing loading status during API calls
  const [loading, setLoading] = useState(false);
  
  // State for storing and displaying error messages
  const [error, setError] = useState(null);

  /**
   * Effect hook to load user data from localStorage on component mount
   * This runs once when the component is first rendered
   */
  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const userData = JSON.parse(storedData);

        // Create profile object from stored user data
        const profileData = {
          name: userData?.fullname?.firstname || "No Name",
          email: userData?.email || "No Email",
          about:
            userData?.about ||
            "Full-stack developer passionate about building scalable web applications.",
        };

        // Update both profile and edit form with the data
        setProfile(profileData);
        setEditForm(profileData);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing userData:", error);
        setError("Error loading user data from storage");
      }
    }
  }, []);

  /**
   * Effect hook to fetch profile data from the API
   * This runs once when the component mounts and attempts to get fresh data from server
   */
  useEffect(() => {
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem('token');
      if (token) {
        try {
          token = JSON.parse(token); // in case it was stringified
        } catch (err) {
          // if it's not JSON, keep it as string
        }
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
      );

      if (response.status === 200 || response.status === 201) {
        const apiProfileData = {
          name: response.data.fullname?.firstname || response.data.name || profile.name,
          email: response.data.email || profile.email,
          about: response.data.about || profile.about,
        };
        setProfile(apiProfileData);
        setEditForm(apiProfileData);
        setUser(response.data);
      }
    } catch (error) {
      console.error("API Error:", error);

      if (error.response) {
        const status = error.response.status;
        if (status === 401) setError("Authentication required. Please log in again.");
        else if (status === 403) setError("Access forbidden. You don't have permission to view this profile.");
        else setError(`Server error: ${status}`);
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  
}, [import.meta.env.VITE_BASE_URL]);

  /**
   * Generate profile logo letter from email's first character
   * @param {string} email - User's email address
   * @returns {string} - Uppercase first letter of email or 'U' as fallback
   */
  const getProfileLogo = (email) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  /**
   * Generate a consistent background color based on email
   * Uses a hash function to ensure same email always gets same color
   * @param {string} email - User's email address
   * @returns {string} - Tailwind CSS background color class
   */
  const getProfileColor = (email) => {
    if (!email) return "bg-purple-600";

    const colors = [
      "bg-purple-600",
      "bg-blue-600",
      "bg-green-600",
      "bg-red-600",
      "bg-yellow-600",
      "bg-pink-600",
      "bg-indigo-600",
      "bg-teal-600",
    ];

    // Create hash from email string
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Return color based on hash modulo
    return colors[Math.abs(hash) % colors.length];
  };

  /**
   * Handle saving profile changes
   * Updates profile state and closes the edit modal
   * In a real app, this would also send data to the server
   */
  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Optional: Save to API
      // Uncomment and modify this section to save changes to your backend
      /*
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        editForm,
        { withCredentials: true }
      );
      */
      
      // Update profile with form data
      setProfile(editForm);
      setIsEditing(false);
      
      // Update localStorage with new data
      const updatedUserData = { ...user, ...editForm };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setUser(updatedUserData);
      
      // Clear any existing errors
      setError(null);
      
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile changes");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle canceling profile edit
   * Resets form data to current profile values and closes modal
   */
  const handleCancel = () => {
    setEditForm(profile); // Reset form to current profile data
    setIsEditing(false);  // Close modal
    setError(null);       // Clear any errors
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header Section - Welcome message and platform description */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Welcome to <span className="text-purple-400">Omnia</span>
          </h1>
          <p className="text-gray-300 mt-1">
            A platform where developers share knowledge, insights, and innovations.
          </p>
        </div>
      </div>

      {/* Error Display Section - Shows error messages if any */}
      {error && (
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Display Section - Shows loading state during API calls */}
      {loading && (
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-4">
            <p className="text-blue-300">Loading profile data...</p>
          </div>
        </div>
      )}

      {/* Main Profile Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
          
          {/* Profile Header - Contains profile picture, name, email, and edit button */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Logo - Generated from email initial */}
                <div
                  className={`w-20 h-20 rounded-full ${getProfileColor(
                    profile.email
                  )} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                >
                  {getProfileLogo(profile.email)}
                </div>

                {/* Profile Info - Name and email */}
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {profile.name}
                  </h2>
                  <p className="text-purple-100 mt-1 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {profile.email}
                  </p>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Content - About section, stats, and posts */}
          <div className="p-8">
            <div className="space-y-6">
              
              {/* About Section - User's description/bio */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-400" />
                  About
                </h3>
                <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                  <p className="text-gray-300 leading-relaxed">
                    {profile.about}
                  </p>
                </div>
              </div>

              {/* Stats Section - Articles and likes count */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-2xl font-bold text-purple-400">124</div>
                  <div className="text-gray-400 text-sm">Articles</div>
                </div>

                <div className="rounded-lg p-4 text-center border border-gray-600">
                  <div className="text-2xl font-bold text-yellow-400">856</div>
                  <div className="text-gray-400 text-sm">Likes</div>
                </div>
              </div>

              {/* Posts Section - Shows approved and pending posts */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Edit3 className="w-5 h-5 mr-2 text-purple-400" />
                  My Posts
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Approved Posts Column */}
                  <div className="bg-gray-700/50 rounded-lg border border-gray-600 overflow-hidden">
                    <div className="bg-green-600/20 border-b border-green-500/30 px-4 py-3">
                      <h4 className="font-semibold text-green-400 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Approved Posts (3)
                      </h4>
                    </div>

                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                      {/* Sample Approved Posts */}
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                        <h5 className="font-medium text-white mb-2">
                          Building Scalable Microservices with Node.js
                        </h5>
                        <p className="text-gray-400 text-sm mb-3">
                          A comprehensive guide on designing and implementing
                          microservices architecture using Node.js and Docker...
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-400 font-medium">
                            Published
                          </span>
                          <span className="text-gray-500">2 days ago</span>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                        <h5 className="font-medium text-white mb-2">
                          React Performance Optimization Tips
                        </h5>
                        <p className="text-gray-400 text-sm mb-3">
                          Learn advanced techniques to optimize React
                          applications including memo, useMemo, and code
                          splitting...
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-400 font-medium">
                            Published
                          </span>
                          <span className="text-gray-500">1 week ago</span>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                        <h5 className="font-medium text-white mb-2">
                          Understanding JavaScript Closures
                        </h5>
                        <p className="text-gray-400 text-sm mb-3">
                          Deep dive into closures, lexical scoping, and
                          practical examples to master this fundamental
                          concept...
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-400 font-medium">
                            Published
                          </span>
                          <span className="text-gray-500">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pending Posts Column */}
                  <div className="bg-gray-700/50 rounded-lg border border-gray-600 overflow-hidden">
                    <div className="bg-yellow-600/20 border-b border-yellow-500/30 px-4 py-3">
                      <h4 className="font-semibold text-yellow-400 flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                        Pending Approval (2)
                      </h4>
                    </div>

                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                      {/* Sample Pending Posts */}
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                        <h5 className="font-medium text-white mb-2">
                          Advanced TypeScript Patterns
                        </h5>
                        <p className="text-gray-400 text-sm mb-3">
                          Exploring advanced TypeScript features including
                          conditional types, mapped types, and template
                          literals...
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-yellow-400 font-medium flex items-center">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1 animate-pulse"></div>
                            Under Review
                          </span>
                          <span className="text-gray-500">
                            Submitted 3 hours ago
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                        <h5 className="font-medium text-white mb-2">
                          Database Optimization Strategies
                        </h5>
                        <p className="text-gray-400 text-sm mb-3">
                          Best practices for optimizing database queries,
                          indexing strategies, and performance monitoring...
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-yellow-400 font-medium flex items-center">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1 animate-pulse"></div>
                            Under Review
                          </span>
                          <span className="text-gray-500">
                            Submitted 1 day ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts Summary - Overview of all posts */}
                <div className="mt-6 bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">5</div>
                      <div className="text-gray-400 text-sm">Total Posts</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">3</div>
                      <div className="text-gray-400 text-sm">Approved</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">2</div>
                      <div className="text-gray-400 text-sm">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal - Overlay modal for editing profile information */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Fields */}
            <div className="p-6 space-y-6">
              
              {/* Full Name Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {/* About Textarea Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  About
                </label>
                <textarea
                  value={editForm.about}
                  onChange={(e) =>
                    setEditForm({ ...editForm, about: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself and what you're currently working on..."
                />
              </div>

              {/* Profile Logo Preview */}
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full ${getProfileColor(
                    editForm.email
                  )} flex items-center justify-center text-white font-bold`}
                >
                  {getProfileLogo(editForm.email)}
                </div>
                <div className="text-sm text-gray-400">
                  Profile logo preview (generated from email)
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex space-x-3 p-6 border-t border-gray-700">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}