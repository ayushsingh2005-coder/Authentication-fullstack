import React from "react";
import { Link } from "react-router-dom";
// FontAwesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faUser,
  faFolder,
  faHexagonNodes,   // ✅ ye solid icons mein hota hai
} from "@fortawesome/free-solid-svg-icons";

import { faEnvelope } from "@fortawesome/free-regular-svg-icons";


const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gradient-to-br  from-purple-600 via-slate-900 to-black">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 text-white">
        <h2 className="text-lg font-semibold mb-6">"Welcome back! Got an idea worth sharing? Let’s put it into words." </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-3 shadow-lg">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="text-yellow-400" />
            <p className="font-medium">Share your stories with the world</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-3 shadow-lg">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-400" />
            <p className="font-medium">Discover blogs that inspire you</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-3 shadow-lg">
            <FontAwesomeIcon icon={faUser} className="text-purple-400" />
            <p className="font-medium">Engage with writers and readers alike</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-3 shadow-lg">
            <FontAwesomeIcon icon={faFolder} className="text-yellow-300" />
            <p className="font-medium">Build your personal brand through writing</p>
          </div>
        </div>

        {/* Small Images Container */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <img
            src="https://api.def.co.th/uploads/content/content_d931fe1189f4cdcc81dec8a9fbee7bc1.png"
            alt="dummy"
            className="rounded-lg shadow-md"
          />
          <img
            src="https://miro.medium.com/v2/resize:fit:1200/1*_WJhxwb0u43mZiCzyWWnww.jpeg"
            alt="dummy"
            className="rounded-lg shadow-md"
          />
          <img
            src="https://miro.medium.com/v2/resize:fit:1200/1*p5_tak5sHYNPVTRoEb8xGQ.png"
            alt="dummy"
            className="rounded-lg shadow-md"
          />
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.sk7HFg3uLHPYhro1TLpsGAHaDz?pid=Api&P=0&h=220"
            alt="dummy"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-6 py-8 bg-gray-900">
        {/* Big Logo */}
        <FontAwesomeIcon
          icon={faHexagonNodes}
          className="text-6xl text-purple-600 mb-4"
        />
        <h1 className="text-3xl font-bold text-purple-600 mb-10">Omnia</h1>

        <h2 className="text-sm tracking-widest mb-8 text-gray-400">
          
        </h2>

        {/* Continue Button with Icon */}
        <Link
          to="/auth"
          className="text-xl flex items-center justify-center w-72 py-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          <FontAwesomeIcon icon={faHexagonNodes} className="mr-3 text-4xl" />
          Continue with Omnia
        </Link>

        {/* Plugged In Icon
        <div className="mt-12 flex flex-col items-center">
          <div className="bg-gray-800 text-white w-24 h-24 flex items-center justify-center rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faHexagonNodes} className="text-4xl" />
          </div>
          <p className="mt-3 text-gray-300 font-medium">Plugged In</p>
        </div> */}

        {/* Terms */}
        <p className="mt-15 text-xs text-gray-500 max-w-xs">
          By continuing, you agree to{" "}
          <Link to="/terms" className="underline text-blue-400">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline text-blue-400">
            Privacy Policy
          </Link>
          . This site is protected by reCAPTCHA Enterprise and{" "}
          <Link to="/google-privacy" className="underline text-blue-400">
            Google Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/google-terms" className="underline text-blue-400">
            Terms of Service
          </Link>{" "}
          apply.
        </p>

        {/* Emergent Branding */}
        {/* <p className="mt-6 text-green-500 font-semibold text-sm">
          LOG IN SECURED BY
        </p>
        <h2 className="text-2xl font-bold text-white">emergent</h2> */}
      </div>
    </div>
  );
};

export default Home;
