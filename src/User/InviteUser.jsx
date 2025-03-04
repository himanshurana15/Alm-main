import React from "react";

const InviteUser = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-6 md:px-12 bg-[#F5F5F5] gap-6">
      {/* Left side - Logo and info */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left pl-10 md:pl-20">
        <div className="w-full max-w-lg p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-black rotate-45"></div>
            <span className="text-[24px] font-semibold">Rhombus</span>
          </div>

          {/* Description */}
          <p className="text-[#5A5A5A] font-inter text-[14px] font-normal leading-[24px] mb-6 ">
            Directly addresses professional learners, emphasizing career
            advancement and practical skill acquisition.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full max-w-[90%] sm:max-w-md lg:max-w-lg h-auto bg-[#FFFFFF] lg:w-1/2 p-6 lg:p-6 flex items-center shadow-lg rounded-lg justify-center mb-[10px] mx-auto">
        <div className="w-full">
          {/* Heading */}
          <h2 className="text-[20px] mt-2 font-medium text-gray-800 text-center sm:text-left">
            Invite New User
          </h2>
          <p className="text-gray-600 text-[12px] font-normal mb-3 leading-[24px] text-center sm:text-left">
            Send an invitation to add a new team member
          </p>

          {/* Form */}
          <form>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[14px] mb-1 font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-[13px] border border-gray-300 rounded-md"
                placeholder="Email address"
              />
              <p className="text-gray-500 text-[13px] mt-1">
                The invitation will be sent to this email address
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-[14px] font-medium text-gray-700 mb-1"
              >
                Select role
              </label>
              <div className="relative">
                <select
                  id="role"
                  className="w-full text-[13px] px-3 py-2 border border-gray-300 rounded-md appearance-none"
                >
                  <option value="">Select Role</option>
                  <option value="System Admin">System Admin</option>
                  <option value="Course Admin">Course Admin</option>
                  <option value="Support Admin">Support Admin</option>
                </select>
                {/* Dropdown Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Role Description */}
            <div className="mb-4">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
                <h3 className="text-blue-600 text-[13px] font-medium mb-1">
                  Role Description
                </h3>
                <p className="text-blue-600 text-[14px]">
                  Example: Full system access and configuration rights
                </p>
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-[14px] font-medium text-gray-700 mb-2"
              >
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                rows="3"
                className="w-full px-3 py-2 text-[13px] font-medium border border-gray-300 rounded-md"
                placeholder="Add a personal message to the invitation email..."
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mb-4 flex-col sm:flex-row gap-4">
              {" "}
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-9 rounded-md"
              >
                Change Role
              </button>
              <button
                type="button"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md border border-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
