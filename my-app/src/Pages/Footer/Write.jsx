import React from "react";

const Write = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Start <span className="text-purple-600">Writing</span>
      </h1>
      <p className="text-gray-400 max-w-2xl mb-8">
        Share your knowledge, insights, and experiences with the community.  
        Writing on Devnovate is simple and developer-friendly.  
      </p>
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Why Write on Omnia?</h2>
        <ul className="list-disc ml-6 text-gray-400 space-y-2">
          <li>Reach thousands of developers worldwide.</li>
          <li>Build your personal brand as a developer.</li>
          <li>Contribute to open knowledge and inspire others.</li>
        </ul>
      </div>
    </div>
  );
};

export default Write;
