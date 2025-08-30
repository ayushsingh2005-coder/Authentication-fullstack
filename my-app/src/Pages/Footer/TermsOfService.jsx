import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Terms of <span className="text-purple-400">Service</span>
      </h1>
      <p className="text-gray-400 mb-8">
        By using Devnovate, you agree to these terms and conditions.
      </p>
      <ul className="list-disc ml-6 text-gray-400 space-y-3">
        <li>You must not post harmful or illegal content.</li>
        <li>Respect intellectual property rights.</li>
        <li>We reserve the right to suspend accounts for violations.</li>
      </ul>
    </div>
  );
};

export default TermsOfService;
