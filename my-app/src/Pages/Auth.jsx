import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Auth = () => {
  const { user, setUser } = React.useContext(UserDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const submitHandlerSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      fullName: {
        firstName: firstname,
        lastName: lastname,
      },
      email: email,
      password: password,
    };

    try {
      // ✅ save full data in context
      setUser(newUser);

      // ✅ send only email to backend
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/sendOtp`,
        { email: newUser.email }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("OTP sent to your email!"); // optional notification
        navigate("/verifyotp"); // ✅ move to OTP page
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong while sending OTP");
    }

    // when form would be submitted then clear the input field
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  // it update the current state and save the data in local storage of the browser
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  //login controller function
  const submitHandlerLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    // Basic validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      console.log("Attempting login with:", loginData);

      // 🔥 API call to login endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        loginData
      );

      console.log("Login response:", response.data); 

      // ✅ Success handling
      if (response.status === 200 && response.data.success) {
        const { token, user: userData } = response.data;

        // Save token to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));

        // Update context with user data
        setUser({
          email: userData.email,
          fullName: {
            firstName: userData.firstname || "",
            lastName: userData.lastname || "",
          },
          password: "", // Don't store password in context
        });

        toast.success(response.data.message || "Login successful!");

        // Clear form
        setEmail("");
        setPassword("");

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);

      // Handle different error types
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Login failed";

        switch (status) {
          case 400:
            toast.error("Invalid email or password format");
            break;
          case 401:
            toast.error("Invalid email or password");
            break;
          case 403:
            toast.error(
              "Account not verified. Please check your email for OTP"
            );
            // Optional: Navigate to OTP verification
            // navigate("/verifyotp");
            break;
          case 404:
            toast.error("User not found");
            break;
          case 500:
            toast.error("Server error. Please try again later");
            break;
          default:
            toast.error(message);
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error("Something went wrong. Please try again");
      }

      // Clear form on error
      setEmail("");
      setPassword("");
    }
  };

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 border-none">
      <div className="w-full max-w-md bg-gray-800/80 p-6 rounded-lg shadow-lg border-gray-700/50 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FontAwesomeIcon
              icon={faHexagonNodes}
              size="2x"
              className="mr-2 text-blue-600"
            />
          </div>
          <h1 className="font-3xl text-4xl font-bold text-blue-600 mb-3">
            Welcome to Omnia{" "}
          </h1>
          <p className="text-gray-300 text-sm">
            Chat with multiple AI models in one place
          </p>
        </div>
        <h2 className="text-2xl text-center text-white mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Login Form */}
        {isLogin ? (
          <form
            className="space-y-4 rounded"
            onSubmit={(e) => {
              submitHandlerLogin(e);
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="email"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-blue-600 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-blue-600 focus:outline-none backdrop-blur-sm"
            />

            <button
              type="submit"
              className=" cursor-pointer w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>
          </form>
        ) : (
          // Signup Form
          <form
            className="space-y-4 rounded"
            onSubmit={(e) => {
              submitHandlerSignup(e);
            }}
          >
            <input
              type="text"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              placeholder="Firstname"
              autoComplete="name"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-blue-600 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              autoComplete="name"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-blue-600 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="email"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-blue-600 focus:outline-none backdrop-blur-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 text-white placeholder-gray-400 rounded focus:border-blue-600 focus:outline-none backdrop-blur-sm"
            />
            <button
              type="submit"
              className=" cursor-pointer w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
            className="cursor-pointer font-medium shadow-4xl text-blue-700 hover:text-blue-400 transition-all duration-300 hover:decoration-white/80 underline-offset-2"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <p className="text-sm font-bold text-gray-400 text-center mt-2">
          <button onClick={() => navigate("/resetpassword")}
         className="text-blue-700 cursor-pointer hover:text-blue-400">
            Forgot Password?
          </button>
        </p>
      </div>
      <ToastContainer
  position="top-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  className="!top-4 !right-4"
  toastClassName={() =>
    "relative flex p-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-black border border-red-700 shadow-2xl"
  }
  bodyClassName={() => "flex text-sm font-medium text-white p-3"}
  progressClassName="bg-blue-500"
/>
    </div>
  );
};

export default Auth;
