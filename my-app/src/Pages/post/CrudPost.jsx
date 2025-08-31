import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CrudPost = () => {
  const navigate = useNavigate();

  // Local state for form
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "",
  });

  // List of posts (fetched from API)
  const [posts, setPosts] = useState([]);

  // Fetch posts when component loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/post`);
        setPosts(res.data.posts || res.data);
      } catch (err) {
        console.error("Fetch Posts Error:", err);
        toast.error("Failed to load posts");
      }
    };

    fetchPosts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { id } = JSON.parse(storedUserData);
      setFormData({
        ...formData,
        userId: id,
      });
    }
  }, []);

  // Handle form submit (create new post) - FIXED
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/create`,
        {
          ...formData
          // ✅ Correct way - inside data object
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Post created Successfully");

        // Use real post from DB
        const createdPost = response.data.post || response.data;
        setPosts([createdPost, ...posts]);

        setFormData({ title: "", content: "" });
        navigate('/post/create')
      } else {
        toast.error(response.data.message || "Failed to Create post ");
      }
    } catch (error) {
      console.error("New Post Creation:", error);
      toast.error("Something went wrong while Creating new post");
    }
  };

  // Handle delete (frontend only for now)
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        Post Dashboard
      </h1>

      {/* Post Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Enter post title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <textarea
          name="content"
          placeholder="Write your content..."
          value={formData.content}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 px-6 cursor-pointer py-2 rounded-lg font-semibold transition"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CrudPost;
