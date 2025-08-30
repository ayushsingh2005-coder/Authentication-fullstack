import React from "react";

const Authors = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Meet Our <span className="text-purple-400">Authors</span>
      </h1>
      <p className="text-gray-400 max-w-2xl mb-8">
        Discover the amazing developers, engineers, and creators who share their knowledge here.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Replace with real authors later */}
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="bg-[#1e293b] rounded-2xl p-6 shadow-md hover:shadow-purple-500/20 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold mb-4">
              A{id}
            </div>
            <h2 className="text-lg font-semibold">Author {id}</h2>
            <p className="text-gray-400 text-sm">Software Engineer & Writer</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
