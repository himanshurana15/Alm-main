// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";

const BusinessUserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Store email if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }

      toast.success("Login successful!");
      navigate("/landingpage");
    } catch (error) {
      console.error("Login Error:", error);
      setError("The username or password you entered is incorrect.");
      toast.error("The username or password you entered is incorrect.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken(); // Get Firebase ID Token

      // console.log("Firebase ID Token:", idToken);

      // Send Google user details to backend
      const response = await axios.post(
        "http://localhost:8080/auth/google-signup",
        {
          email: user.email,
          name: user.displayName,
          profileImage: user.photoURL,
          isSocialMediaLogin: true,
          idToken: idToken, // ✅ Send as 'idToken' instead of 'accessToken'
        }
      );

      console.log("Google signup successful:", response.data);
      navigate("/landingpage"); // Redirect to dashboard after signup
    } catch (error) {
      if (error.response && error.response.data.includes("inactive")) {
        // alert(
        //   "Your account is inactive. Please log in with a different email."
        // );

        // Sign out the inactive user from Firebase
        await auth.signOut();

        // Clear stored user details (optional)
        // localStorage.removeItem("user");
        handleGoogleSignup();

      } else {
        alert("Google signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="w-full h-130 max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-[24px] font-semibold text-center leading-normal text-[#202020]">
        Welcome back
      </h2>

      <p className="text-[#202020] text-center text-[14px] font-normal leading-normal mb-8">
        Sign in to access your account
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <p className="text-red-500 flex text-center text-sm mb-4">{error}</p>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/forgetpassword"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Login securely
        </button>

        <div className="flex items-center justify-center space-x-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          <button
            className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50"
            onClick={handleGoogleSignup}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
              <path
                fill="#4285F4"
                d="M24 9.5c3.39 0 6.25 1.17 8.54 3.13l6.4-6.4C34.9 2.27 29.87 0 24 0 14.67 0 6.94 5.68 3.4 13.96l7.41 5.78C13 13.03 18 9.5 24 9.5z"
              ></path>
              <path
                fill="#34A853"
                d="M46.67 24.56c0-1.48-.14-2.91-.39-4.31H24v8.13h13.12c-.6 3.12-2.3 5.8-4.86 7.64l7.41 5.78c4.37-4.03 6.92-9.97 6.92-16.24z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.81 28.95c-1.54-.99-2.84-2.33-3.79-3.88l-7.41 5.78c2.86 5.68 8.56 9.91 15.39 11.01l7.41-5.78c-3.34-.83-6.16-2.63-8.6-5.13z"
              ></path>
              <path
                fill="#EA4335"
                d="M24 46c5.87 0 10.9-1.93 15.39-5.61l-7.41-5.78c-2.34 1.56-5.28 2.5-8.6 2.5-7.01 0-12.97-4.7-15.16-11.13l-7.41 5.78C7.07 40.32 14.8 46 24 46z"
              ></path>
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#1877F2"
                d="M23.998 12C23.998 5.373 18.626 0 12 0 5.373 0 0 5.373 0 12c0 5.99 4.388 10.953 10.125 11.854v-8.387H7.078v-3.467h3.047V9.432c0-3.007 1.793-4.669 4.533-4.669 1.312 0 2.688.235 2.688.235v2.953h-1.51c-1.49 0-1.953.925-1.953 1.875v2.25h3.328l-.532 3.467h-2.796v8.387C19.61 22.953 24 17.99 24 12h-.002z"
              ></path>
            </svg>
            Facebook
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-6">
          Protected by reCAPTCHA and subject to the Rhombus{" "}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Terms of Service
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default BusinessUserForm;
