// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSuperUser } from "../../redux/authSlice";
import BusinessUserForm from "../components/BusinessUserForm";
import SuperUserForm from "../components/SuperUserForm";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const Login = () => {
  const isSuperUser = useSelector((state) => state.auth.isSuperUser);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen h-full bg-[#F5F5F5] flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 px-6 py-6 md:px-12 md:py-12 ml-6 md:ml-12 flex flex-col justify-center">
        {/* Logo & Title */}
        <div className="flex items-center mb-6 md:mb-12 w-[175px] h-[40px] flex-shrink-0">
          <div className="w-8 h-8 border-2 border-black transform rotate-45"></div>
          <span className="ml-2 text-lg md:text-xl font-medium">Rhombus</span>
        </div>

        {/* Headings */}
        <h1 className="text-2xl md:text-[36px] font-semibold leading-tight md:leading-[46px] text-[#202020] mb-2">
          Welcome back
        </h1>
        <h2 className="text-2xl md:text-[36px] font-semibold leading-tight md:leading-[46px] text-[#202020] mb-4">
          to ALM
        </h2>

        {/* Description */}
        <p className="text-[#5A5A5A] text-sm md:text-[14px] font-normal leading-[24px] w-full max-w-[344px] mb-4 md:mb-6">
          Directly addresses professional learners, emphasizing career
          advancement and practical skill acquisition.
        </p>

        {/* Toggle Login Mode */}
        <div
          className="flex items-center text-blue-500 cursor-pointer gap-2"
          onClick={() => dispatch(toggleSuperUser())}
        >
          {isSuperUser && (
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          )}
          <span className="text-[#1977F3] font-inter text-sm md:text-[14px] font-normal leading-normal">
            {isSuperUser ? "Login as User" : "Login as Super User"}
          </span>
        </div>
      </div>

      {/* Right Side - Form Section with Animation */}
      <div className="w-full md:w-1/2 p-2 mr-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSuperUser ? "superUserForm" : "userForm"}
            initial={{ opacity: 0, x: 50 }} // Start from right
            animate={{ opacity: 1, x: 0 }} // Animate to center
            exit={{ opacity: 0, x: -50 }} // Exit to left
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full max-w-md"
          >
            {isSuperUser ? <SuperUserForm /> : <BusinessUserForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
