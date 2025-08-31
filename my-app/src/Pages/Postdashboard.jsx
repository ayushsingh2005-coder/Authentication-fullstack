import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [postData , setpostData] = useState(null);

  // Get user data
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const userId = userData?.id;

  const naviagte = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchUserPosts();
      console.log(postData);
      
      fetchUserStats();
    }
  }, [userId, activeTab]);

  const createPost = ()=>{
    navigate('/crudpost');
  }

  // console.log(userId);

  // useEffect(() => {
  //     const storedUserData = localStorage.getItem("userData");
  //     if (storedUserData) {
  //       const { id } = JSON.parse(storedUserData);
       
  //     }
  //   }, []);

  const fetchUserPosts = async () => {
    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post/read/${userId}`)

      console.log(response)

      setpostData(response);

      console.log("Post data set ")

    } catch (error) {
      console.log(error)
    }
  };

  const fetchUserStats = async () => {
    try {
      // Get user-specific stats
      const allPosts = await axios.get(`http://localhost:8000/post/user/${userId}?status=all`);
      
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

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/post/delete/${postId}`);
      
      if (response.data.success) {
        setSuccess('Post deleted successfully');
        fetchUserPosts(); // Refresh posts
        fetchUserStats(); // Refresh stats
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete post');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      approved: 'bg-green-500/20 text-green-300 border-green-500/30',
      rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
      deleted: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    
    return `px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.pending}`;
  };

  const filteredPosts = activeTab === 'all' 
    ? userPosts 
    : userPosts.filter(post => post.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-400">Welcome back, {userData?.name || 'User'}</p>
          </div>
          <button
            onClick={createPost}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition"
          >
            Create New Post
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium">Total Posts</h3>
            <p className="text-2xl font-bold">{stats.total || 0}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium">Approved</h3>
            <p className="text-2xl font-bold text-green-400">{stats.approved || 0}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium">Total Views</h3>
            <p className="text-2xl font-bold text-blue-400">{stats.totalViews || 0}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm font-medium">Total Likes</h3>
            <p className="text-2xl font-bold text-red-400">{stats.totalLikes || 0}</p>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-lg mb-6">
            {error}
            <button onClick={() => setError('')} className="float-right">×</button>
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          {['all', 'approved', 'pending', 'rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-semibold transition capitalize ${
                activeTab === tab 
                  ? 'text-white border-b-2 border-indigo-500' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab} ({tab === 'all' ? stats.total || 0 : stats[tab] || 0})
            </button>
          ))}
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-slate-400">Loading your posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">No posts found</h3>
            <p className="text-slate-400 mb-6">
              {activeTab === 'all' 
                ? "You haven't created any posts yet." 
                : `No ${activeTab} posts found.`
              }
            </p>
            {activeTab === 'all' && (
              <button
                onClick={createPost}
                className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg transition"
              >
                Create Your First Post
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div key={post._id} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-indigo-500/50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <span className={getStatusBadge(post.status)}>
                        {post.status}
                      </span>
                    </div>
                    
                    <p className="text-slate-400 mb-4">
                      {post.content.length > 200 
                        ? post.content.substring(0, 200) + '...'
                        : post.content
                      }
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                      {post.updatedAt && post.updatedAt !== post.createdAt && (
                        <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                      )}
                      <span>Views: {post.views || 0}</span>
                      <span>Likes: {post.likes?.length || 0}</span>
                      <span>Comments: {post.comments?.length || 0}</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => navigate(`/post/${post._id}`)}
                      className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded text-sm transition"
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
                          onClick={() => navigate(`/post/edit/${post._id}`)}
                          className="bg-yellow-600 hover:bg-yellow-500 px-3 py-2 rounded text-sm transition"
                          title="Edit Post"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="bg-red-600 hover:bg-red-500 px-3 py-2 rounded text-sm transition"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;