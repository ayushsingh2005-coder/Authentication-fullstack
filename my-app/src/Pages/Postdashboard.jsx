import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Get user data
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  // console.log(userData)
  const userId = userData?.id;

  useEffect(() => {
    if (userId) {
      fetchUserPosts();
      // fetchUserStats(); // Commented out for later use
    }
  }, [userId, activeTab]);

  const createPost = () => {
    navigate('/crudpost');
  };

  const fetchUserPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/read/${userId}`);
      
      console.log("API Response:", response);
      
      // Handle the response data properly
      if (response.data && response.data.success) {
        setUserPosts(response.data.posts || []);
        calculateStats(response.data.posts || []);
      } else if (response.data && Array.isArray(response.data)) {
        setUserPosts(response.data);
        calculateStats(response.data);
      } else {
        setUserPosts([]);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
      setIsLoading(false);
    }
  };

  // Calculate stats from fetched posts
  const calculateStats = (posts) => {
    const stats = {
      total: posts.length,
      approved: posts.filter(p => p.status === 'approved').length,
      pending: posts.filter(p => p.status === 'pending').length,
      rejected: posts.filter(p => p.status === 'rejected').length,
      totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
      totalLikes: posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0)
    };
    setStats(stats);
  };

  // Uncomment and modify these functions when ready to implement
  /*
  const fetchUserStats = async () => {
    try {
      const allPosts = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/user/${userId}?status=all`);
      
      if (allPosts.data.success) {
        const posts = allPosts.data.posts;
        const stats = {
          total: posts.length,
          approved: posts.filter(p => p.status === 'approved').length,
          pending: posts.filter(p => p.status === 'pending').length,
          rejected: posts.filter(p => p.status === 'rejected').length,
          totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
          totalLikes: posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0)
        };
        setStats(stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/like/${postId}`);
      if (response.data.success) {
        fetchUserPosts(); // Refresh posts to update like count
      }
    } catch (error) {
      setError('Failed to like post');
    }
  };

  const handleCommentPost = async (postId, comment) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/comment/${postId}`, {
        comment: comment
      });
      if (response.data.success) {
        fetchUserPosts(); // Refresh posts to update comment count
      }
    } catch (error) {
      setError('Failed to add comment');
    }
  };
  */

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/post/delete/${postId}`);
      
      if (response.data.success) {
        setSuccess('Post deleted successfully');
        fetchUserPosts(); // Refresh posts
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete post');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleEditPost = (postId) => {
    navigate(`/post/edit/${postId}`);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      approved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
      deleted: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    
    return `px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`;
  };

  const filteredPosts = activeTab === 'all' 
    ? userPosts 
    : userPosts.filter(post => post.status === activeTab);

  return (
    <>
    
    <Navbar/>

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-400 text-lg mt-2">Welcome back, {userData?.fullname.firstname || 'User'}</p>
          </div>
          <button
            onClick={createPost}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Total Posts</h3>
                <p className="text-3xl font-bold">{stats.total || 0}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Approved</h3>
                <p className="text-3xl font-bold text-emerald-400">{stats.approved || 0}</p>
              </div>
              <div className="bg-emerald-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Total Views</h3>
                <p className="text-3xl font-bold text-blue-400">{stats.totalViews || 0}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Total Likes</h3>
                <p className="text-3xl font-bold text-pink-400">{stats.totalLikes || 0}</p>
              </div>
              <div className="bg-pink-500/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={() => setError('')} 
                className="text-red-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-300 p-4 rounded-xl mb-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <span>{success}</span>
              <button 
                onClick={() => setSuccess('')} 
                className="text-emerald-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-slate-800/30 p-1 rounded-2xl backdrop-blur-sm border border-slate-700/50">
          {['all', 'approved', 'pending', 'rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-6 font-semibold rounded-xl transition-all duration-300 capitalize ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab} ({tab === 'all' ? stats.total || 0 : stats[tab] || 0})
            </button>
          ))}
        </div>

        {/* Posts Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="relative mx-auto mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-indigo-500 mx-auto"></div>
                <div className="animate-pulse absolute inset-0 rounded-full bg-indigo-500/20"></div>
              </div>
              <p className="text-slate-400 text-lg">Loading your posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-slate-700/50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">No posts found</h3>
              <p className="text-slate-400 mb-8 text-lg">
                {activeTab === 'all' 
                  ? "You haven't created any posts yet. Start sharing your thoughts!" 
                  : `No ${activeTab} posts found.`
                }
              </p>
              {activeTab === 'all' && (
                <button
                  onClick={createPost}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Create Your First Post
                </button>
              )}
            </div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50">
              <div className="p-6 space-y-6">
                {filteredPosts.map((post, index) => (
                  <div 
                    key={post._id} 
                    className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group"
                  >
                    {/* Post Header */}
                    <div className="p-6 border-b border-slate-700/50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {post.title}
                            </h3>
                            <span className={getStatusBadge(post.status)}>
                              {post.status}
                            </span>
                          </div>
                          
                          <p className="text-slate-400 leading-relaxed">
                            {post.content && post.content.length > 150 
                              ? post.content.substring(0, 150) + '...'
                              : post.content || 'No content available'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Post Footer */}
                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        {/* Post Metadata */}
                        <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{post.views || 0} views</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{post.likes?.length || 0} likes</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.comments?.length || 0} comments</span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewPost(post._id)}
                            className="bg-blue-600/80 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                            title="View Post"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          
                          {post.status !== 'deleted' && (
                            <>
                              <button
                                onClick={() => handleEditPost(post._id)}
                                className="bg-amber-600/80 hover:bg-amber-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                                title="Edit Post"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              
                              <button
                                onClick={() => handleDeletePost(post._id)}
                                className="bg-red-600/80 hover:bg-red-500 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                                title="Delete Post"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Uncomment when ready to implement additional features */}
        {/*
        // Quick Actions Panel
        <div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-xl p-4 transition-all duration-300">
              <div className="text-center">
                <svg className="w-8 h-8 text-indigo-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">Analytics</span>
              </div>
            </button>
            
            <button className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-xl p-4 transition-all duration-300">
              <div className="text-center">
                <svg className="w-8 h-8 text-emerald-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-sm font-medium">Followers</span>
              </div>
            </button>
            
            <button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl p-4 transition-all duration-300">
              <div className="text-center">
                <svg className="w-8 h-8 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">Settings</span>
              </div>
            </button>
            
            <button className="bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 rounded-xl p-4 transition-all duration-300">
              <div className="text-center">
                <svg className="w-8 h-8 text-pink-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">Favorites</span>
              </div>
            </button>
          </div>
        </div>
        */}
      </div>
      
      {/* Custom CSS for scrollbar */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.8);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 1);
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    </>
  );
};

export default Dashboard;