import React from "react";

const WritingGuidelines = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Writing <span className="text-purple-400">Guidelines</span>
      </h1>
      <p className="text-gray-400 mb-8">
        To ensure high-quality content, please follow these writing guidelines before publishing.
      </p>
      <ul className="list-disc ml-6 text-gray-400 space-y-3">
        <li>Use clear and concise language.</li>
        <li>Provide code snippets and examples when possible.</li>
        <li>Avoid plagiarism – always give credit.</li>
        <li>Format your article for readability (headings, lists, spacing).</li>
      </ul>
    </div>
  );
};

export default WritingGuidelines;
