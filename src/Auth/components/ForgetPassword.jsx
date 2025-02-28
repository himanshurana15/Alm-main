import React from "react";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {


  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-6 md:px-12 py-12 bg-[#F5F5F5] gap-6">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left pl-10 md:pl-20">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-black rotate-45"></div>
            <span className="text-2xl font-semibold">Rhombus</span>
          </div>

          {/* Description */}
          <p className="text-[#5A5A5A] font-inter text-[14px] font-normal leading-[24px] mb-6">
            Directly addresses professional learners, emphasizing career
            advancement and practical skill acquisition.
          </p>

          {/* Secure Connection */}
          <div className="flex items-center gap-3 w-full max-w-[350px] px-5 py-3 border border-[#107A2B] rounded-[13px] bg-[rgba(52,199,89,0.24)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M13.6875 19.4062L20.5625 12.5L18.9688 10.9062L13.6875 16.2188L11.0312 13.5625L9.4375 15.1562L13.6875 19.4062ZM15 27C12.1875 26.3125 9.85938 24.7204 8.01562 22.2238C6.17188 19.7269 5.25 16.9544 5.25 13.9062V6.75L15 3L24.75 6.75V13.9062C24.75 16.9544 23.8281 19.7269 21.9844 22.2238C20.1406 24.7204 17.8125 26.3125 15 27ZM15 24.6562C17.1667 23.9844 18.9583 22.6406 20.375 20.625C21.7917 18.6094 22.5 16.3698 22.5 13.9062V8.28125L15 5.40625L7.5 8.28125V13.9062C7.5 16.3698 8.20833 18.6094 9.625 20.625C11.0417 22.6406 12.8333 23.9844 15 24.6562Z"
                fill="#1B8135"
              />
            </svg>
            <div>
              <div className="text-base text-[14px] font-medium text-green-800">
                Secure Connection
              </div>
              <div className="text-green-700 text-[14px] self-stretch">
                Your connection to this site is encrypted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2  flex justify-center px-4">
        <div className="w-full max-w-lg bg-[#FFFFFF]  p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-[24px] font-semibold mb-4 text-center md:text-left">
            Forgot Your Password?
          </h1>

          <p className="text-gray-600 text-[14px] mb-6 text-center md:text-left">
            To reset your password, choose a verification method below. We will
            send a verification code to your selected contact method.
          </p>

          <div className="space-y-4 h-54 ">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">
                Verify via Email
              </label>
              <input
                type="email"
                
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <button className="w-full bg-blue-500 text-white py-3 mt-5 rounded-lg hover:bg-blue-600 font-medium" onClick={() => navigate("/emailverify")}>
              Send via Email
            </button>

            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>

          <div className="mt-21 flex text=[14px] text-center text-gray-600">
            Need help? Contact your system administrator.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
