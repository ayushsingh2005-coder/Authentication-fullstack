import React from 'react';
import { Link } from 'react-router-dom';

// Icons ke liye Helper component
const Icon = ({ name, className }) => {
  const icons = {
    arrowRight: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
    user: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    likes: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
    views: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    comments: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  };
  return icons[name] || null;
};

// Blog card ke liye component
const BlogCard = ({ post }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-all duration-300">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-300 py-1 px-3 rounded-full">{post.category}</span>
                <span className="text-xs text-slate-400">{post.date}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{post.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="text-sm font-semibold text-white">{post.author.name}</p>
                        <p className="text-xs text-slate-400">@{post.author.handle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1.5 text-sm"><Icon name="likes" className="w-4 h-4" /><span>{post.stats.likes}</span></div>
                    <div className="flex items-center gap-1.5 text-sm"><Icon name="comments" className="w-4 h-4" /><span>{post.stats.comments}</span></div>
                    <div className="flex items-center gap-1.5 text-sm"><Icon name="views" className="w-4 h-4" /><span>{post.stats.views}</span></div>
                </div>
            </div>
        </div>
    </div>
);


export default function App() {
    // Sample data for blog posts
    const blogPosts = [
        {
            id: 1,
            image: 'https://placehold.co/600x400/1e293b/94a3b8?text=React',
            category: 'Frontend',
            date: 'Jan 14, 2025',
            title: 'React Performance Optimization: From Basics to Advanced',
            description: 'Discover proven techniques to make your React applications lightning-fast with code splitting, momoization, and more.',
            author: { name: 'Sarah Johnson', handle: 'sarahdev', avatar: 'https://placehold.co/40x40/94a3b8/1e293b?text=SJ' },
            stats: { likes: 89, comments: 12, views: '892' }
        },
        {
            id: 2,
            image: 'https://placehold.co/600x400/1e293b/94a3b8?text=AI/ML',
            category: 'AI/ML',
            date: 'Jan 13, 2025',
            title: 'The Future of AI in Web Development',
            description: 'Explore how artificial intelligence is revolutionizing the way we build, test, and deploy web applications.',
            author: { name: 'Mike Chen', handle: 'miketech', avatar: 'https://placehold.co/40x40/94a3b8/1e293b?text=MC' },
            stats: { likes: 156, comments: 24, views: '1.5k' }
        },
    ];

    const trendingArticles = [
        { id: 1, title: 'The Future of AI in Web Development', description: 'Explore how artificial intelligence is revolutionizing...' },
        { id: 2, title: 'Building Scalable Microservices with Node.js and Docker', description: 'Learn how to architect and deploy microservices...' },
        { id: 3, title: 'React Performance Optimization: From Basics to Advanced', description: 'Discover proven techniques to make your React apps...' },
    ];
    
    const categories = ["All", "Frontend", "Backend", "AI/ML", "DevOps", "Mobile"];

    return (
        <div className="min-h-screen w-full bg-slate-900 font-sans text-slate-300">
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8092ff] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>
                
                <div className="mx-auto max-w-4xl py-20 sm:py-28 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Welcome to <span className="text-indigo-400">Devnovate</span></h1>
                        <p className="mt-6 text-lg leading-8 text-slate-400">A platform where developers share knowledge, insights, and innovations. Join our community of tech enthusiasts and thought leaders.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/post/create"  className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300">Start Writing </Link>
                            <a href="#" className="rounded-md bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-slate-700 hover:bg-slate-700 transition-colors duration-300">Explore Trending</a>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl -mt-16 sm:-mt-20 lg:-mt-24 pb-20">
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 shadow-2xl text-white">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-semibold bg-white/20 text-white py-1 px-3 rounded-full">Featured</span>
                            <span className="text-xs font-semibold bg-white/20 text-white py-1 px-3 rounded-full">Backend</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Building Scalable Microservices with Node.js and Docker</h2>
                        <p className="mt-3 text-indigo-100 text-base">Learn how to architect and deploy microservices that can handle millions of requests with modern containerization techniques.</p>
                        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-200/50 flex items-center justify-center"><Icon name="user" className="w-6 h-6 text-white" /></div>
                                <div><p className="font-semibold">John Doe</p><p className="text-sm text-indigo-200">@johndoe</p></div>
                            </div>
                            <div className="flex items-center gap-6 text-indigo-200">
                                <div className="flex items-center gap-1.5"><Icon name="likes" className="w-5 h-5" /> <span className="text-sm font-medium">124</span></div>
                                <div className="flex items-center gap-1.5"><Icon name="views" className="w-5 h-5" /> <span className="text-sm font-medium">18k</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Feed Section */}
            <main className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4 border-b border-slate-700">
                                <button className="py-2 px-1 text-white border-b-2 border-indigo-500 font-semibold">Latest</button>
                                <button className="py-2 px-1 text-slate-400 hover:text-white transition">Trending</button>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-8">
                            {categories.map((cat, index) => (
                               <button key={cat} className={`px-4 py-2 text-sm font-medium rounded-full transition ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                                   {cat}
                               </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blogPosts.map(post => <BlogCard key={post.id} post={post} />)}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                            <h3 className="text-xl font-bold text-white mb-4">Trending This Week</h3>
                            <ul className="space-y-4">
                                {trendingArticles.map(article => (
                                    <li key={article.id}>
                                        <a href="#" className="font-semibold text-white hover:text-indigo-400 transition">{article.title}</a>
                                        <p className="text-sm text-slate-400 mt-1">{article.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                            <h3 className="text-xl font-bold text-white mb-4">Popular Categories</h3>
                            <ul className="space-y-2">
                                {categories.slice(1).map(cat => (
                                    <li key={cat}><a href="#" className="text-slate-300 hover:text-indigo-400 transition">{cat}</a></li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>

        </div>
    );
}

