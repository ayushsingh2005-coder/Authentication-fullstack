import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Main App Component
export default function Create() {
    const navigate = useNavigate();
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  const { id } = userData;
  console.log(id);

  // State for form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // State for notification visibility
  const [showNotification, setShowNotification] = useState(false);

  // State to trigger the initial animation
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!title.trim() || !content.trim()) {
      // In a real app, you'd show a more user-friendly error message
      console.error("Validation failed: Title and content are required.");
      return;
    }

    // Create a post object with the "pending" status
    const newPost = {
      title: title,
      content: content,
      userId: id,
    };

    const response = await axios.post("http://localhost:8000/post/create", newPost);
    console.log(response);
    

    // In a real production app, you would send this 'newPost' object
    // to your backend API endpoint using fetch() or axios.
    console.log("New Post Submitted:", newPost);

    // Show a success notification
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide after 3 seconds

    // Clear the form fields
    setTitle("");
    setContent("");
    navigate("/dashboard")
    
  };

  // Notification Component
  const Notification = () => (
    <div
      className={`fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 transition-all duration-500 ease-in-out transform ${
        showNotification
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      }`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">
        Post submitted successfully! It is now pending review.
      </div>
    </div>
  );

  return (
    // Forcing dark mode and adding the main container styles
    <div className="dark bg-gray-900 text-gray-200 flex items-center justify-center min-h-screen p-4 font-['Inter',_sans-serif] overflow-hidden">
      {/* Added a style tag for the custom keyframe animation */}
      <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
      <div className="w-full max-w-2xl mx-auto">
        <div
          className={`bg-gray-800 shadow-2xl rounded-2xl p-8 transition-all duration-700 ease-out ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl font-bold text-center text-violet-600 mb-2">
            Create New Post
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Share your thoughts with the world.
          </p>

          {/* Blog Post Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="postTitle"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Post Title
              </label>
              <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-700 rounded-lg focus:ring-1 focus:ring-violet-600 focus:outline-none  transition-all duration-300"
                placeholder="Write the title of Your Post"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="postContent"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Your Content
              </label>
              <textarea
                id="postContent"
                name="postContent"
                rows="8"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-1 focus:ring-violet-600 focus:outline-none transition-all duration-300"
                placeholder="Write your blog post here..."
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-blue-800 transition-all duration-300 transform active:scale-95"
              >
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>

      <Notification />
    </div>
  );
}
