// eslint-disable-next-line no-unused-vars
import React from "react";
// import { useState } from "react";
import BusinessUserForm from "../components/BusinessUserForm";
// import SuperUserForm from "../components/SuperUserForm";
// import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const Login = () => {
  // const [isSuperUser, setIsSuperUser] = useState(false);

  return (
    <div className="min-h-screen h-full bg-[#F5F5F5] flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 px-6 py-6 md:px-12 md:py-12 ml-6 md:ml-12 flex flex-col justify-center">
        {/* Logo & Title */}
        <div className="flex items-center gap-1 mb-1">
          <img
            src="/ALM LOGO BRIGHT.png"
            alt="Logo"
            className="w-45 h-30 object-contain"
          />
        </div>

        {/* Headings */}
        <h1 className="text-2xl md:text-[26px] font-semibold leading-tight md:leading-[46px] text-[#202020] mb-2">
          Welcome back to ALM
        </h1>
        

        {/* Description */}
        <p className="text-[#5A5A5A] text-sm md:text-[14px] font-normal leading-[24px] w-full max-w-[344px] mb-4 md:mb-6">
          Directly addresses professional learners, emphasizing career
          advancement and practical skill acquisition.
        </p>

        {/* Toggle Login Mode */}
        {/* <div
          className="flex items-center text-blue-500 cursor-pointer gap-2"
          onClick={() => setIsSuperUser(!isSuperUser)}
        >
          {isSuperUser && (
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          )}
          <span className="text-[#1977F3] font-inter text-sm md:text-[14px] font-normal leading-normal">
            {isSuperUser ? "Login as User" : "Login as Super User"}
          </span>
        </div> */}
      </div>

      {/* Right Side - Form Section with Animation */}
      <div className="w-full md:w-1/2 p-2 mr-10 flex items-center justify-center">
      <BusinessUserForm />
        {/* <AnimatePresence mode="wait">
          <motion.div
            key={isSuperUser ? "superUserForm" : "userForm"}
            initial={{ opacity: 0, x: 50 }} // Start from right
            animate={{ opacity: 1, x: 0 }} // Animate to center
            exit={{ opacity: 0, x: -50 }} // Exit to left
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full max-w-md"
          >
            {isSuperUser ? <SuperUserForm /> : }
          </motion.div>
        </AnimatePresence> */}
      </div>
    </div>
  );
};

export default Login;
