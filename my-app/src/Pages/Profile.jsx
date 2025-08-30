import React, { useState } from "react";
import { User, Mail, Edit3, Save, X } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Ayush",
    email: "ayush@devnovate.com",
    about:
      "Full-stack developer passionate about building scalable web applications. Currently working on microservices architecture and exploring modern JavaScript frameworks.",
  });

  useEffect(() => {
    try {
      const res = axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        withCredentials: true // Required for cross-origin requests
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  // Generate profile logo from email's first character
  const getProfileLogo = (email) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  // Generate a consistent color based on email
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

    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Welcome to <span className="text-purple-400">Devnovate</span>
          </h1>
          <p className="text-gray-300 mt-1">
            A platform where developers share knowledge, insights, and
            innovations.
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Logo */}
                <div
                  className={`w-20 h-20 rounded-full ${getProfileColor(
                    profile.email
                  )} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                >
                  {getProfileLogo(profile.email)}
                </div>

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

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* About Section */}
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

              {/* Stats Section */}
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

              {/* post summary  */}
              {/* Posts Section */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Edit3 className="w-5 h-5 mr-2 text-purple-400" />
                  My Posts
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Approved Posts */}
                  <div className="bg-gray-700/50 rounded-lg border border-gray-600 overflow-hidden">
                    <div className="bg-green-600/20 border-b border-green-500/30 px-4 py-3">
                      <h4 className="font-semibold text-green-400 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Approved Posts (3)
                      </h4>
                    </div>

                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                      {/* Approved Post 1 */}
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

                      {/* Approved Post 2 */}
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

                      {/* Approved Post 3 */}
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

                  {/* Pending Posts */}
                  <div className="bg-gray-700/50 rounded-lg border border-gray-600 overflow-hidden">
                    <div className="bg-yellow-600/20 border-b border-yellow-500/30 px-4 py-3">
                      <h4 className="font-semibold text-yellow-400 flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                        Pending Approval (2)
                      </h4>
                    </div>

                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                      {/* Pending Post 1 */}
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

                      {/* Pending Post 2 */}
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

                {/* Posts Summary */}
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

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Name Field */}
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

              {/* Email Field */}
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

              {/* About Field */}
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

              {/* Preview Profile Logo */}
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

            {/* Modal Actions */}
            <div className="flex space-x-3 p-6 border-t border-gray-700">
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
