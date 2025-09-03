import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Privacy <span className="text-purple-600">Policy</span>
      </h1>
      <p className="text-gray-400 mb-6">
        Your privacy is important to us. This page outlines how we handle your data.
      </p>
      <div className="space-y-4 text-gray-400">
        <p>We only collect data necessary for providing a personalized experience.</p>
        <p>Your data is never sold to third parties.</p>
        <p>You may request account deletion anytime.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
