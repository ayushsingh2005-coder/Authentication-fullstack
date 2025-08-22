import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserContext, { UserDataContext } from "../Context/UserContext";


const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserDataContext);

  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    navigate('/signup/verify')

  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    navigate('/')
  };

  const handleChangeFirst = (e) => {
    setUser((prev) => ({
      ...prev,
      fullName: {
        ...prev.fullName,
        firstName: e.target.value,
      },
    }));
  };

  const handleChangeLast = (e) => {
    setUser((prev) => ({
      ...prev,
      fullName: {
        ...prev.fullName,
        lastName: e.target.value,
      },
    }));
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 border-none">
      <div className="w-full max-w-md bg-gray-800/80 p-6 rounded-lg shadow-lg border-gray-700/50 backdrop-blur-md">
        {/* ADDED: Welcome header with OmniaChat branding and logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FontAwesomeIcon
              icon={faHexagonNodes}
              size="2x"
              className="mr-2 text-blue-600"
            />
          </div>
          {/* ADDED: Welcome message with platform name */}
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            Welcome to Omnia{" "}
          </h1>
          <p className="text-gray-300 text-sm">
            Chat with multiple AI models in one place
          </p>
        </div>

        {/* Fixed: Moved heading outside of form and added proper title */}
        <h2 className="text-2xl text-center text-white mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Login Form */}
        {isLogin ? (
          <form className="space-y-4 rounded" onSubmit={handleSubmitLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-gray-400 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-gray-400 focus:outline-none backdrop-blur-sm"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Login
            </button>
          </form>
        ) : (
          // Signup Form
          <form className="space-y-4 rounded" onSubmit={handleSubmitSignUp}>
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              value={user.fullName.firstname}
              onChange={handleChangeFirst}
              autoComplete="name"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-gray-400 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={user.fullName.lastname}
              onChange={handleChangeLast}
              autoComplete="name"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-gray-400 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-gray-400 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              // Fixed: Added proper autocomplete attribute for new password
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-gray-400 focus:outline-none backdrop-blur-sm"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Toggle between login and signup */}
        <p className="text-violet-200/80 text-lg text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium shadow-4xl text-violet-700 hover:text-white transition-all duration-300 hover:decoration-white/80 underline-offset-2"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <p className="text-sm font-bold text-gray-400 text-center mt-2">
          <button className="text-blue-400 cursor-pointer hover:text-white">
            Forgot Password?
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
