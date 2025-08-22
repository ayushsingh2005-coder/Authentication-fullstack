import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast for notifications
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword() {
  // Get user context and navigation function
  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate(); // Initialize navigation

  // STATE MANAGEMENT - This component uses multiple useState hooks to manage different forms
  const [step, setStep] = useState("email"); // Controls which form to show: 'email', 'otp', or 'password'
  const [email, setEmail] = useState(""); // Stores email input for FORM 1
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Stores OTP digits for FORM 2
  const [newPassword, setNewPassword] = useState(""); // Stores new password for FORM 3
  const [confirmPassword, setConfirmPassword] = useState(""); // Stores confirm password for FORM 3
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [message, setMessage] = useState(""); // Status messages
  const [messageType, setMessageType] = useState(""); // Message type: 'success' or 'error'
  const otpRefs = useRef([]); // Refs for OTP input fields to handle focus

  // FORM 1 HANDLER - Email submission form
  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Validate email input
    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    // Create user object (FIXED: removed undefined variables)
    const userData = {
      email: email,
    };

    try {
      // Store email in context for later use
      setUser({ ...user, email: email });

      // API call to send reset OTP - FIXED ENDPOINT
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/send-reset-otp`,
        { email: userData.email }
      );

      // FIXED: Check response.data.success instead of status code only
      if (response.status === 200 || response.status === 201) {
        // Also check if your backend sends success: true
        if (response.data.success !== false) {
          toast.success("OTP sent to your email for password reset");
          setMessage(`OTP sent to ${email}`);
          setMessageType("success");
          setStep("otp"); // Switch to OTP form
        } else {
          toast.error(response.data.message || "Failed to send OTP");
          setMessage(response.data.message || "Failed to send OTP");
          setMessageType("error");
        }
      } else {
        toast.error(response.data.message || "Failed to send OTP");
        setMessage(response.data.message || "Failed to send OTP");
        setMessageType("error");
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Failed to send OTP";

        switch (status) {
          case 400:
            toast.error("Invalid email format");
            break;
          case 401:
            toast.error("Invalid email");
            break;
          case 404:
            toast.error("Email not found in our records");
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
    } finally {
      setIsLoading(false); // FIXED: Removed setTimeout wrapper
    }
  };

  // OTP INPUT HANDLERS - For FORM 2 (OTP inputs)
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input when digit is entered
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace - focus previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // FORM 2 HANDLER - OTP verification form (Modified to go to password step)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    // Validate OTP completeness
    if (otpString.length !== 6) {
      setMessage("Please enter the complete OTP");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // REMOVED: Since your backend doesn't have verify-reset-otp endpoint
      // We'll skip OTP verification step and go directly to password reset
      // The OTP will be verified when we call reset-password endpoint

      setMessage("OTP entered successfully!");
      setMessageType("success");
      toast.success("Proceeding to password reset");

      // Move to password reset step
      setTimeout(() => {
        setStep("password"); // Switch to FORM 3
        setMessage(""); // Clear message
      }, 1000);

      return; // Skip the API call since endpoint doesn't exist

      // SIMPLIFIED: Since we're not making API call above
      // Just proceed to next step
    } catch (error) {
      // This shouldn't execute now, but keeping for safety
      toast.error("Something went wrong");
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // FORM 3 HANDLER - Password reset form
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate password inputs
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in both password fields");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // API call to reset password using your exact route
      console.log("Sending reset password request:", {
        email: email,
        otp: otp.join(""),
        newPassword: newPassword,
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/reset-password`,
        {
          email: email,
          otp: otp.join(""), // Send the OTP from Form 2
          newPassword: newPassword,
        }
      );

      console.log("Reset password response:", response.data);

      // Check for success in response data (based on your backend controller)
      if (response.data.success) {
        setMessage("Password reset successfully! Redirecting to dashboard...");
        setMessageType("success");
        toast.success(
          response.data.message || "Password has been reset successfully"
        );

        // Navigate to dashboard after successful password reset
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Handle case where success is false
        toast.error(response.data.message || "Password reset failed");
        setMessage(response.data.message || "Password reset failed");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Password Reset Error:", error);

      if (error.response) {
        const status = error.response.status;
        const errorMessage =
          error.response.data?.message || "Password reset failed";

        console.log("Error response:", error.response.data);

        switch (status) {
          case 400:
            toast.error("Invalid input data");
            setMessage("Invalid input data");
            break;
          case 401:
            toast.error("Invalid or expired OTP");
            setMessage("Invalid or expired OTP");
            break;
          case 404:
            toast.error("User not found or invalid endpoint");
            setMessage("User not found");
            break;
          case 500:
            toast.error("Server error. Please try again later");
            setMessage("Server error. Please try again later");
            break;
          default:
            toast.error(errorMessage);
            setMessage(errorMessage);
        }
      } else if (error.request) {
        console.log("Network error:", error.request);
        toast.error("Network error. Please check your connection");
        setMessage("Network error. Please check your connection");
      } else {
        console.log("Other error:", error.message);
        toast.error("Something went wrong. Please try again");
        setMessage("Something went wrong. Please try again");
      }
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // RESEND OTP HANDLER - For FORM 2
  const handleResendOTP = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      // FIXED: Call the correct endpoint that exists in your backend
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/send-reset-otp`,
        { email: email }
      );

      // Check if request was successful
      if (response.status === 200 || response.status === 201) {
        if (response.data.success !== false) {
          setMessage("OTP resent successfully");
          setMessageType("success");
          toast.success("New OTP sent to your email");
          setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
          otpRefs.current[0]?.focus(); // Focus first OTP input
        } else {
          toast.error(response.data.message || "Failed to resend OTP");
          setMessage("Failed to resend OTP");
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
      toast.error("Failed to resend OTP");
      setMessage("Failed to resend OTP");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // RENDER TWO DIFFERENT FORMS BASED ON STEP STATE
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-10 w-full max-w-md text-center shadow-2xl border border-slate-600/50">
        {/* Logo */}
        <div className="text-blue-600 text-1xl mb-3 font-light">
          <FontAwesomeIcon
            icon={faHexagonNodes}
            size="2x"
            className="mr-2 text-blue-600"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-blue-600 mb-2">
          Reset Password
        </h1>

        {/* Dynamic subtitle based on current step */}
        <p className="text-slate-300 text-base mb-10 leading-relaxed">
          {step === "email"
            ? "Enter your email to receive an OTP for password reset"
            : "Enter the 6-digit OTP sent to your email"}
        </p>

        {/* Status Message Display */}
        {message && (
          <div
            className={`p-3 rounded-lg mb-6 text-sm font-medium ${
              messageType === "success"
                ? "bg-green-900/50 text-green-300 border border-green-700/50"
                : "bg-red-900/50 text-red-300 border border-red-700/50"
            }`}
          >
            {message}
          </div>
        )}

        {/* CONDITIONAL FORM RENDERING */}
        {step === "email" ? (
          /* FORM 1: Email Input Form */
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-medium mb-6 text-white">
                Enter your Email
              </h2>

              <div className="text-left mb-6">
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-4 text-base border-2 border-slate-600 rounded-xl bg-slate-700 text-white placeholder-slate-400 outline-none transition-all duration-300 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-400/10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOTP}
              disabled={isLoading}
              className="w-full p-4 text-base font-semibold border-black rounded-xl bg-black text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-700 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mb-4"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="w-full  p-4 text-base font-medium border-2 border-black rounded-xl bg-transparent text-slate-200 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white hover:border-blue-600"
            >
              Back to Login
            </button>
          </div>
        ) : step === "otp" ? (
          /* FORM 2: OTP Verification Form */
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-medium mb-6 text-white">
                Verify OTP
              </h2>

              <div className="text-left mb-2">
                <label className="block text-slate-200 text-sm font-medium mb-3">
                  Enter 6-digit OTP
                </label>
              </div>

              {/* OTP Input Fields - 6 separate inputs */}
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-slate-600 rounded-lg bg-slate-700 text-white outline-none transition-all duration-300 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-400/10"
                    disabled={isLoading}
                  />
                ))}
              </div>

              {/* Display email where OTP was sent */}
              <p className="text-slate-400 text-sm mb-6">
                OTP sent to: <span className="text-blue-500 font-medium">{email}</span>
              </p>
            </div>

            {/* Verify OTP Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading}
              className="w-full p-4 text-base font-semibold border-none rounded-xl bg-black text-white cursor-pointer transition-all duration-300  hover:shadow-lg hover:bg-blue-600 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mb-4"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend OTP Button */}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading}
              className="w-full p-4 text-base font-semibold border-2 border-slate-600 rounded-xl bg-transparent text-slate-200 cursor-pointer transition-all duration-300 hover:border-blue-600 hover:text-blue-500 disabled:opacity-60 disabled:cursor-not-allowed mb-4"
            >
              {isLoading ? "Resending..." : "Resend OTP"}
            </button>

            {/* Change Email Button - Go back to Form 1 */}
            <button
              type="button"
              onClick={() => {
                setStep("email"); // Switch back to email form
                setOtp(["", "", "", "", "", ""]); // Clear OTP
                setMessage(""); // Clear messages
              }}
              className="w-full p-4 text-base font-semibold border-2 border-slate-600 rounded-xl bg-transparent text-slate-200 cursor-pointer transition-all duration-300 hover:border-blue-600 hover:text-blue-500"
            >
              Change Email
            </button>
          </div>
        ) : (
          /* FORM 3: Password Reset Form */
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-medium mb-6 text-white">
                Reset Password
              </h2>

              {/* New Password Input */}
              <div className="text-left mb-4">
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-4 text-base border-2 border-slate-400 rounded-xl bg-slate-700 text-white placeholder-slate-400 outline-none transition-all duration-300 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-400/10"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="text-left mb-6">
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full p-4 text-base border-2 border-slate-400 rounded-xl bg-slate-700 text-white placeholder-slate-400 outline-none transition-all duration-300 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-400/10"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              {/* Display email for confirmation */}
              <p className="text-slate-400 text-sm mb-6">
                Resetting password for:{" "}
                <span className="text-blue-400 font-medium">{email}</span>
              </p>
            </div>

            {/* Reset Password Button */}
            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full p-4 text-base font-semibold border-none rounded-xl bg-black text-white cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:shadow-green-500/30 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mb-4"
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>

            {/* Back to OTP Button */}
            <button
              type="button"
              onClick={() => {
                setStep("otp"); // Go back to OTP verification
                setNewPassword(""); // Clear password fields
                setConfirmPassword("");
                setMessage(""); // Clear messages
              }}
              className="w-full p-4 text-base font-semibold border-2 border-slate-600 rounded-xl bg-transparent text-slate-200 cursor-pointer transition-all duration-300 hover:border-blue-600 hover:text-blue-500"
            >
              Back to OTP
            </button>
          </div>
        )}

        {/* Footer Links */}
        <div className="mt-6 text-sm">
          <span className="text-slate-400">Remember your password? </span>
          <button
            onClick={() => navigate("/auth")}
            className="text-blue-600 font-bold no-underline transition-colors duration-300 hover:text-blue-300 bg-transparent border-none cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

// NOTE : Handler function structure : Input → Validation → API Call → Response → State Update structure
