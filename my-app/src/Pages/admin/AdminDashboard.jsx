import React, { useState, useEffect } from 'react';
import { Users, FileText, Eye, EyeOff, Trash2, Check, X, Clock, Archive, UserCheck, UserX } from 'lucide-react';

// Mock Router Component - Replace with React Router in actual implementation
const Router = ({ children }) => children;

// Mock Link Component - Replace with React Router Link
const Link = ({ to, children, className }) => (
  <div 
    className={className}
    onClick={() => console.log(`Navigate to: ${to}`)}
    style={{ cursor: 'pointer' }}
  >
    {children}
  </div>
);

// Main Dashboard Component
const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
    approvedPosts: 0
  });

  // API call for dashboard stats
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Replace with actual API endpoint
      // const response = await fetch('/api/admin/dashboard-stats');
      // const data = await response.json();
      // setStats(data);
      
      // Mock data for demonstration
      setStats({
        totalUsers: 150,
        totalPosts: 45,
        pendingPosts: 12,
        approvedPosts: 33
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  // Navigation Component
  const Sidebar = () => (
    <div className="w-64 bg-slate-800 min-h-screen p-4">
      <div className="space-y-2">
        <SidebarItem 
          icon={<Eye size={20} />} 
          label="Overview" 
          active={currentPage === 'overview'}
          onClick={() => setCurrentPage('overview')}
        />
        <SidebarItem 
          icon={<FileText size={20} />} 
          label="Posts" 
          active={currentPage === 'posts'}
          onClick={() => setCurrentPage('posts')}
        />
        <SidebarItem 
          icon={<Users size={20} />} 
          label="Users" 
          active={currentPage === 'users'}
          onClick={() => setCurrentPage('users')}
        />
        <SidebarItem 
          icon={<Archive size={20} />} 
          label="Analytics" 
          active={currentPage === 'analytics'}
          onClick={() => setCurrentPage('analytics')}
        />
      </div>
    </div>
  );

  const SidebarItem = ({ icon, label, active, onClick }) => (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

  // Overview Page Component
  const OverviewPage = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="text-blue-400" size={24} />}
          color="blue"
        />
        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={<FileText className="text-green-400" size={24} />}
          color="green"
        />
        <StatCard
          title="Pending Posts"
          value={stats.pendingPosts}
          icon={<Clock className="text-yellow-400" size={24} />}
          color="yellow"
        />
        <StatCard
          title="Approved Posts"
          value={stats.approvedPosts}
          icon={<Check className="text-green-400" size={24} />}
          color="green"
        />
      </div>
    </div>
  );

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-slate-700 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className={`text-3xl font-bold text-${color}-400`}>{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );

  // Posts Management Page Component
  const PostsPage = () => {
    const postActions = [
      {
        title: "Get All Users",
        description: "View and manage all registered users",
        icon: <Users className="text-blue-400" size={24} />,
        route: "/admin/users/all",
        color: "blue"
      },
      {
        title: "Get Single User Profile",
        description: "View detailed user profile information",
        icon: <UserCheck className="text-cyan-400" size={24} />,
        route: "/admin/users/profile",
        color: "cyan"
      },
      {
        title: "Delete User",
        description: "Remove user account permanently",
        icon: <UserX className="text-red-400" size={24} />,
        route: "/admin/users/delete",
        color: "red"
      },
      {
        title: "Get Pending Posts",
        description: "Review posts awaiting approval",
        icon: <Clock className="text-yellow-400" size={24} />,
        route: "/admin/posts/pending",
        color: "yellow"
      },
      {
        title: "Approve Post",
        description: "Approve pending posts for publication",
        icon: <Check className="text-green-400" size={24} />,
        route: "/admin/posts/approve",
        color: "green"
      },
      {
        title: "Reject Post",
        description: "Reject inappropriate or invalid posts",
        icon: <X className="text-red-400" size={24} />,
        route: "/admin/posts/reject",
        color: "red"
      },
      {
        title: "Get Approved Posts",
        description: "View all approved and published posts",
        icon: <FileText className="text-green-400" size={24} />,
        route: "/admin/posts/approved",
        color: "green"
      },
      {
        title: "Get Rejected Posts",
        description: "View all rejected posts with reasons",
        icon: <Archive className="text-gray-400" size={24} />,
        route: "/admin/posts/rejected",
        color: "gray"
      },
      {
        title: "Get Deleted Posts",
        description: "View permanently deleted posts",
        icon: <Trash2 className="text-red-400" size={24} />,
        route: "/admin/posts/deleted",
        color: "red"
      },
      {
        title: "Delete Post",
        description: "Permanently delete posts from system",
        icon: <Trash2 className="text-orange-400" size={24} />,
        route: "/admin/posts/delete",
        color: "orange"
      },
      {
        title: "Hide Post",
        description: "Hide posts from public view temporarily",
        icon: <EyeOff className="text-purple-400" size={24} />,
        route: "/admin/posts/hide",
        color: "purple"
      },
      {
        title: "Get Hidden Posts",
        description: "View all hidden posts",
        icon: <Eye className="text-indigo-400" size={24} />,
        route: "/admin/posts/hidden",
        color: "indigo"
      }
    ];

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Posts Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postActions.map((action, index) => (
            <ActionCard key={index} {...action} />
          ))}
        </div>
      </div>
    );
  };

  // Action Card Component for Posts Page
  const ActionCard = ({ title, description, icon, route, color }) => (
    <Link
      to={route}
      className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors border-l-4 border-purple-500"
    >
      <div className="flex items-center gap-4 mb-3">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
      <div className="mt-4 text-sm text-purple-400">
        Click to manage →
      </div>
    </Link>
  );

  // Individual Action Pages - These would be separate components in actual implementation
  const PendingPostsPage = () => {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchPendingPosts();
    }, []);

    const fetchPendingPosts = async () => {
      try {
        setLoading(true);
        // API call to get pending posts
        // const response = await fetch('/api/admin/posts/pending');
        // const data = await response.json();
        // setPendingPosts(data);
        
        // Mock data
        setPendingPosts([
          { id: 1, title: "Sample Post 1", author: "John Doe", createdAt: "2023-01-01" },
          { id: 2, title: "Sample Post 2", author: "Jane Smith", createdAt: "2023-01-02" }
        ]);
      } catch (error) {
        console.error('Error fetching pending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const approvePost = async (postId) => {
      try {
        // API call to approve post
        // await fetch(`/api/admin/posts/${postId}/approve`, { method: 'POST' });
        console.log(`Approving post ${postId}`);
        fetchPendingPosts(pagination.currentPage); // Refresh current page
      } catch (error) {
        console.error('Error approving post:', error);
      }
    };

    const rejectPost = async (postId) => {
      try {
        // API call to reject post
        // await fetch(`/api/admin/posts/${postId}/reject`, { method: 'POST' });
        console.log(`Rejecting post ${postId}`);
        fetchPendingPosts(pagination.currentPage); // Refresh current page
      } catch (error) {
        console.error('Error rejecting post:', error);
      }
    };

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Pending Posts</h1>
          <div className="flex items-center space-x-4">
            <select
              value={pagination.itemsPerPage}
              onChange={(e) => {
                const newLimit = parseInt(e.target.value);
                setPagination(prev => ({ ...prev, itemsPerPage: newLimit, currentPage: 1 }));
                fetchPendingPosts(1, newLimit);
              }}
              className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400 text-lg">Loading posts...</div>
          </div>
        ) : pendingPosts.length === 0 ? (
          <div className="bg-slate-700 p-8 rounded-lg text-center">
            <Clock className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-400 text-lg">No pending posts found</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {pendingPosts.map(post => (
                <div key={post.id} className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-yellow-600 text-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
                          PENDING
                        </span>
                        <span className="text-gray-400 text-sm">ID: {post.id}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                      <p className="text-gray-400 mb-2">By {post.author} • {post.createdAt}</p>
                      <p className="text-gray-300 text-sm">{post.excerpt}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => approvePost(post.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Check size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => rejectPost(post.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <X size={16} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Component */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
            />
          </>
        )}
      </div>
    );
  };

  // Placeholder pages for Users and Analytics
  const UsersPage = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Users Management</h1>
      <div className="bg-slate-700 p-8 rounded-lg text-center">
        <Users className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-gray-400">Users management page coming soon...</p>
      </div>
    </div>
  );

  const AnalyticsPage = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>
      <div className="bg-slate-700 p-8 rounded-lg text-center">
        <Archive className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-gray-400">Analytics dashboard coming soon...</p>
      </div>
    </div>
  );

  // Main render function
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'posts':
        return <PostsPage />;
      case 'users':
        return <UsersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'pending-posts':
        return <PendingPostsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;