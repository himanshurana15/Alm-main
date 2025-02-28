import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-10 bg-blue-900">
      <div className="flex justify-center space-x-190">
        <div className="h-10 w-30 justify-center space-x-1 flex items-center bg-blue-600 rounded px-4 py-2 text-white cursor-pointer" >
          click button
        </div>
        <div className="h-10 w-30 justify-center space-x-1 flex items-center bg-blue-600 rounded px-4 py-2 text-white cursor-pointer" onClick={() => navigate("/UserManagement")}>
          User Profile
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
        <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3x1 mx-auto">
          Empower your future with the courses designed to{" "}
          <span className="text-blue-600"> fit your choice.</span>
        </h1>
        <p className="md:block hidden text-gray-500 max-w-2x1 mx-auto">
          We bring together world-class instructors, interactive content, and a
          supportive community to help you achieve your personal and
          professional goals.
        </p>
        <p className="md:hidden text-gray-500 max-w-sm mx-auto">
          We bring together world-class instructors to help you achieve your
          professional goals.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
