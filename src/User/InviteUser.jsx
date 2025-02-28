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
      <div className="w-full h-162 bg-[#FFFFFF]  lg:w-1/2 lg:p-18   flex items-center">
        <div className="w-full mt-2  max-w-md">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">
            Invite New User
          </h2>
          <p className="text-gray-600 mb-6">
            Send an invitation to add a new team member
          </p>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Email address"
              />
              <p className="text-gray-500 text-sm mt-1">
                The invitation will be sent to this email address
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 mb-2">
                Select role
              </label>
              <div className="relative">
                <select
                  id="role"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
                >
                  <option>select Role</option>
                </select>
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

            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4">
                <h3 className="text-blue-600 font-medium mb-1">
                  Role Description
                </h3>
                <p className="text-blue-600">
                  example: full system acess and configuration rights
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Add a personal message to the invitation email.."
              ></textarea>
            </div>

            <div className="flex justify-between mb-10 flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-16 rounded-md"
              >
                Change role
              </button>

              <button
                type="button"
                className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-9 rounded-md border border-gray-300"
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
