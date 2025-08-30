import React from "react";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Help <span className="text-purple-400">Center</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Need assistance? Browse our FAQs or reach out to support.
      </p>
      <div className="space-y-6">
        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">How do I publish an article?</h2>
          <p className="text-gray-400">Click on <b>Create Post</b> from the top bar and start writing your article.</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Can I edit my articles later?</h2>
          <p className="text-gray-400">Yes, you can edit or delete your posts anytime from your dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
