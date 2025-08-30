import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, Heart, MessageCircle, Clock, User } from 'lucide-react';

const Trending = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('today');

  // Mock data - replace with your API call
  const mockPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications in 2025",
      author: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      excerpt: "Discover the latest patterns and best practices for building React apps that can handle millions of users...",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      views: 12500,
      likes: 389,
      comments: 45,
      readTime: 8,
      publishedAt: "2h ago",
      trending: true
    },
    {
      id: 2,
      title: "The Future of AI in Web Development",
      author: "Marcus Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      excerpt: "How artificial intelligence is revolutionizing the way we build and maintain web applications...",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
      views: 8900,
      likes: 267,
      comments: 32,
      readTime: 6,
      publishedAt: "4h ago",
      trending: true
    },
    {
      id: 3,
      title: "Mastering CSS Grid Layout Techniques",
      author: "Emily Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      excerpt: "Advanced CSS Grid techniques that will transform your layout game and make responsive design effortless...",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      views: 6700,
      likes: 198,
      comments: 28,
      readTime: 5,
      publishedAt: "6h ago",
      trending: true
    },
    {
      id: 4,
      title: "Database Optimization for High-Traffic Apps",
      author: "Alex Thompson",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      excerpt: "Performance tips and tricks for scaling your database to handle millions of concurrent users...",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
      views: 5400,
      likes: 156,
      comments: 19,
      readTime: 7,
      publishedAt: "8h ago",
      trending: false
    }
  ];

  // API call function - replace with your actual API endpoint
  const fetchTrendingPosts = async (filter = 'today') => {
    setLoading(true);
    try {
      // Replace this with your actual API call
      // const response = await fetch(`/api/posts/trending?timeframe=${filter}`);
      // const data = await response.json();
      // setPosts(data.posts);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingPosts(timeFilter);
  }, [timeFilter]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const PostCard = ({ post }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-all duration-300 hover:transform hover:scale-[1.02] border border-gray-700 hover:border-violet-500/50">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-8 h-8 rounded-full ring-2 ring-violet-500/30"
            />
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.publishedAt}</span>
            </div>
            {post.trending && (
              <div className="flex items-center gap-1 bg-violet-600/20 text-violet-400 px-2 py-1 rounded-full text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 hover:text-violet-400 cursor-pointer transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(post.views)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{formatNumber(post.likes)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <div className="w-full h-48 md:h-full bg-gray-700"></div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            <div className="h-4 bg-gray-700 rounded w-32"></div>
          </div>
          <div className="h-6 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="h-4 bg-gray-700 rounded w-12"></div>
              <div className="h-4 bg-gray-700 rounded w-12"></div>
              <div className="h-4 bg-gray-700 rounded w-12"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-violet-500" />
            <h1 className="text-4xl font-bold text-white">Trending Posts</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Discover the most popular and engaging content on our platform
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
            {['today', 'week', 'month', 'all-time'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  timeFilter === filter
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-500" />
              <span className="text-gray-400 text-sm">Total Views</span>
            </div>
            <span className="text-2xl font-bold text-white">2.1M</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-400 text-sm">Total Likes</span>
            </div>
            <span className="text-2xl font-bold text-white">89.2K</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <span className="text-gray-400 text-sm">Comments</span>
            </div>
            <span className="text-2xl font-bold text-white">12.8K</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-500" />
              <span className="text-gray-400 text-sm">Active Authors</span>
            </div>
            <span className="text-2xl font-bold text-white">1.2K</span>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          ) : (
            posts.map((post, index) => (
              <div key={post.id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-3 -left-3 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10">
                    <TrendingUp className="w-4 h-4" />
                    #1 Trending
                  </div>
                )}
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {!loading && (
          <div className="text-center mt-8">
            <button 
              onClick={() => fetchTrendingPosts(timeFilter)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;