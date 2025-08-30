import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('Latest');

  // Sample data - replace with API calls
  const samplePosts = [
    {
      id: 1,
      title: 'React Performance Optimization: From Basics to Advanced',
      description: 'Discover proven techniques to make your React applications lightning-fast.',
      category: 'Frontend',
      date: 'Jan 14, 2025',
      author: {
        name: 'Sarah Johnson',
        handle: 'sarahdev',
        avatar: 'https://placehold.co/40x40/94a3b8/1e293b?text=SJ'
      },
      likes: 89,
      comments: 12,
      views: 892
    },
    {
      id: 2,
      title: 'The Future of AI in Web Development',
      description: 'Explore how artificial intelligence is revolutionizing web applications.',
      category: 'AI/ML',
      date: 'Jan 13, 2025',
      author: {
        name: 'Mike Chen',
        handle: 'miketech',
        avatar: 'https://placehold.co/40x40/94a3b8/1e293b?text=MC'
      },
      likes: 156,
      comments: 24,
      views: 1500
    }
  ];

  const sampleTrending = [
    { id: 1, title: 'The Future of AI in Web Development', description: 'Explore how artificial intelligence is revolutionizing...' },
    { id: 2, title: 'Building Scalable Microservices', description: 'Learn how to architect and deploy microservices...' },
    { id: 3, title: 'React Performance Optimization', description: 'Discover proven techniques to make your React apps...' }
  ];

  const categories = ["All", "Frontend", "Backend", "AI/ML", "DevOps", "Mobile"];

  // Load posts when component mounts
  useEffect(() => {
    loadPosts();
    loadTrendingPosts();
  }, []);

  // API call to fetch all posts
  const loadPosts = async () => {
    try {
      // TODO: Replace with actual API call using axios
      // const response = await axios.get('http://localhost:3001/api/posts');
      // setPosts(response.data);
      
      // For now, using sample data
      setPosts(samplePosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  // API call to fetch trending posts for sidebar
  const loadTrendingPosts = async () => {
    try {
      // TODO: Replace with actual API call using axios
      // const response = await axios.get('http://localhost:3001/api/posts/trending');
      // setTrendingPosts(response.data);
      
      // For now, using sample data
      setTrendingPosts(sampleTrending);
    } catch (error) {
      console.error('Error loading trending posts:', error);
    }
  };

  // Filter posts by category
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  // Handle category filter change
  const handleCategoryChange = async (category) => {
    setActiveCategory(category);
    
    // TODO: API call to fetch posts by category
    // try {
    //   const url = category === 'All' 
    //     ? 'http://localhost:3001/api/posts' 
    //     : `http://localhost:3001/api/posts?category=${category}`;
    //   const response = await axios.get(url);
    //   setPosts(response.data);
    // } catch (error) {
    //   console.error('Error filtering posts by category:', error);
    // }
  };

  // Handle tab change (Latest/Trending)
  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    
    // TODO: API call based on tab selection
    // try {
    //   const endpoint = tab === 'Latest' 
    //     ? 'http://localhost:3001/api/posts/latest' 
    //     : 'http://localhost:3001/api/posts/trending';
    //   const response = await axios.get(endpoint);
    //   setPosts(response.data);
    // } catch (error) {
    //   console.error('Error changing tab:', error);
    // }
  };

  // Handle navigation to create post page
  const handleStartWriting = () => {
    // TODO: Replace with router navigation
    // navigate('/post/create');
    console.log('Navigate to create post page');
  };

  // Handle navigation to trending page
  const handleExploreTrending = () => {
    // TODO: Replace with router navigation  
    // navigate('/trending');
    console.log('Navigate to trending page');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative px-6 pt-14 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl">
          <div className="relative left-1/2 w-96 -translate-x-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-20 aspect-square rotate-45"></div>
        </div>
        
        {/* Hero content */}
        <div className="max-w-4xl mx-auto py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-indigo-400">Devnovate</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10">
            A platform where developers share knowledge, insights, and innovations.
          </p>
          
          {/* Action buttons - keeping original functionality */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleStartWriting}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition"
            >
              Start Writing
            </button>
            <button 
              onClick={handleExploreTrending}
              className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-semibold border border-slate-700 transition"
            >
              Explore Trending
            </button>
          </div>
        </div>

        {/* Featured post */}
        <div className="max-w-4xl mx-auto -mt-10 pb-20">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-white">
            <div className="flex gap-2 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Backend</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">Building Scalable Microservices with Node.js</h2>
            <p className="text-indigo-100 mb-6">Learn how to architect and deploy microservices that can handle millions of requests.</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-semibold">JD</span>
                </div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-indigo-200 text-sm">@johndoe</p>
                </div>
              </div>
              <div className="flex gap-4 text-indigo-200">
                <span>❤️ 124</span>
                <span>👁️ 18k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Posts section */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-slate-700">
              {['Latest', 'Trending'].map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`py-2 px-4 font-semibold transition ${
                    activeTab === tab 
                      ? 'text-white border-b-2 border-indigo-500' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Posts list */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-indigo-500 transition">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-xs pt-1">{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-slate-400 mb-4">{post.description}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-3">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">{post.author.name}</p>
                        <p className="text-slate-400 text-sm">@{post.author.handle}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-slate-400 text-sm">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                      <span>👁️ {post.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Trending section */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Trending This Week</h3>
              <div className="space-y-4">
                {/* TODO: Fetch trending posts from API */}
                {/* 
                useEffect(() => {
                  const fetchTrending = async () => {
                    try {
                      const response = await axios.get('http://localhost:3001/api/posts/trending');
                      setTrendingPosts(response.data);
                    } catch (error) {
                      console.error('Error fetching trending posts:', error);
                    }
                  };
                  fetchTrending();
                }, []);
                */}
                {trendingPosts.map(post => (
                  <div key={post.id}>
                    <h4 className="font-semibold text-white hover:text-indigo-400 transition cursor-pointer">
                      {post.title}
                    </h4>
                    <p className="text-slate-400 text-sm mt-1">{post.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories section */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
              <div className="space-y-2">
                {categories.slice(1).map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className="block text-slate-300 hover:text-indigo-400 transition cursor-pointer"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Hero;