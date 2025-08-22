import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserDataContext } from "../Context/UserContext";

const OtpVerification = () => {
  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Auto move to next input
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Move back on backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      // Get OTP from inputs
      const otpArray = inputRefs.current.map((el) => el.value);
      const otp = otpArray.join("");
      
      // Validate OTP
      if (otp.length !== 6) {
        toast.error("Please enter complete 6-digit OTP");
        return;
      }

      console.log("User data from context:", user);
      console.log("Sending OTP verification for:", user.email);

      // STEP 1: Verify OTP first
      const otpResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/verifyOtp`,
        { email: user.email, otp }
      );
      
      // ONLY proceed if OTP verification successful
      if (otpResponse.status === 200 || otpResponse.status === 201) {
        toast.success("OTP verified successfully!");

        const registrationData = {
          fullname: {  
            firstname: user.fullName.firstName,  // 🔥 
            lastname: user.fullName.lastName,
          },
          email: user.email,
          password: user.password,
        };

        console.log("Sending registration data:", registrationData);
        
        const registerResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/register`,
          registrationData
        );

        if (registerResponse.status === 200 || registerResponse.status === 201) {
          toast.success("Registration completed successfully!");
          navigate("/dashboard");
        } else {
          toast.error(registerResponse.data.message || "Registration failed");
        }
        
      } else {
        toast.error(otpResponse.data.message || "Invalid OTP");
      }

    } catch (error) {
      console.error("Error:", error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Something went wrong";
        
        if (status === 400) {
          toast.error(message);
        } else if (status === 409) {
          toast.error("User already exists");
        } else if (status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(message);
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <form
        onSubmit={onSubmitHandler}
        className="bg-gray-800/80 p-10 rounded-lg shadow-lg w-[380px] text-sm"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Verify OTP
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-6" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 bg-slate-800 border border-blue-600 focus:border-blue-700 text-white text-center text-xl rounded-md"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className="cursor-pointer w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gradient-to-r from-blue-700 to-blue-700"
        >
          Verify OTP
        </button>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Didn't receive the code?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </form>
    </div>
  );
};

export default OtpVerification;