import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import OtpVerification from "./Pages/OtpVerification";
import Dashboard from "./Pages/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import Create from "./Pages/Create";
import Trending from "./Pages/Trending";
import Profile from "./Pages/Profile";
import { Toaster } from "react-hot-toast"; 
import AdminAuth from "./Pages/admin/AdminAuth";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Categories from "./Pages/Footer/Categories";
import Authors from "./Pages/Footer/Authors";
import Write from "./Pages/Footer/Write";
import HelpCenter from "./Pages/Footer/HelpCenter";
import WritingGuidelines from "./Pages/Footer/WritingGuidelines";
import PrivacyPolicy from "./Pages/Footer/PrivacyPolicy";
import TermsOfService from "./Pages/Footer/TermsOfService";


const App = () => {
  return (
    <div className="App">
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#374151',
            color: '#fff',
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/verifyotp" element={<OtpVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/post/create" element={<Create />} />
        <Route path="/post/trending" element={<Trending />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* footer items routes */}
        <Route path="/categories" element={<Categories/>} />
        <Route path="/authors" element={<Authors/>} />
        <Route path="/write" element={<Write/>} />
        <Route path="/help" element={<HelpCenter/>} />
        <Route path="/guidelines" element={<WritingGuidelines/>} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/term" element={<TermsOfService/>} />
        
      </Routes>
    </div>
  );
};

export default App;
