// // eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";

// const SuperUserForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: localStorage.getItem("superEmail") || "",
//     password: "",
//   });

//   useEffect(() => {
//     if (formData.email) {       
//       setRememberMe(true);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // eslint-disable-next-line no-unused-vars
//       const response = await axios.post(
//         "http://localhost:8080/auth/login",
//         {
//           email: formData.email,
//           password: formData.password,
//           role
//         }
//       );
//       // console.log(response.data);

//       if (rememberMe) {
//         localStorage.setItem("superEmail", formData.email);
//       } else {
//         localStorage.removeItem("superEmail");
//       }

//       toast.success("Super User Login Successful!");
//       setIsPasswordCorrect(true);
//       setTimeout(() => navigate("/admin-dashboard"), 500);
//     } catch (error) {
//       setIsPasswordCorrect(false);
//       toast.error(
//         error.response?.data?.message || "Incorrect Email or Password!"
//       );
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//       <h2 className="text-[24px] text-center font-bold">Super User Login</h2>

//       <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
//         {/* Email Input */}
//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Password Input */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>

//         {/* Incorrect Password Message */}
//         {!isPasswordCorrect && (
//           <div className="text-red-500 text-sm">
//             The username or password you entered is incorrect.
//           </div>
//         )}

//         {/* Remember Me & Forgot Password */}
//         <div className="flex items-center justify-between">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               className="rounded border-gray-300"
//               checked={rememberMe}
//               onChange={() => setRememberMe(!rememberMe)}
//             />
//             <span className="text-sm">Remember me</span>
//           </label>
//           <Link
//             to="/forgetpassword"
//             className="text-sm text-blue-600 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
//         >
//           Login securely
//         </button>

//         {/* OR Separator */}
//         <div className="flex items-center justify-center space-x-4 mt-2">
//           <div className="flex-1 h-px bg-gray-300"></div>
//           <span className="text-gray-500 text-sm">or</span>
//           <div className="flex-1 h-px bg-gray-300"></div>
//         </div>

//         {/* Google & Facebook Buttons */}
//         <div className="grid grid-cols-2 gap-4">
//           <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
//               <path
//                 fill="#4285F4"
//                 d="M24 9.5c3.39 0 6.25 1.17 8.54 3.13l6.4-6.4C34.9 2.27 29.87 0 24 0 14.67 0 6.94 5.68 3.4 13.96l7.41 5.78C13 13.03 18 9.5 24 9.5z"
//               ></path>
//               <path
//                 fill="#34A853"
//                 d="M46.67 24.56c0-1.48-.14-2.91-.39-4.31H24v8.13h13.12c-.6 3.12-2.3 5.8-4.86 7.64l7.41 5.78c4.37-4.03 6.92-9.97 6.92-16.24z"
//               ></path>
//               <path
//                 fill="#FBBC05"
//                 d="M10.81 28.95c-1.54-.99-2.84-2.33-3.79-3.88l-7.41 5.78c2.86 5.68 8.56 9.91 15.39 11.01l7.41-5.78c-3.34-.83-6.16-2.63-8.6-5.13z"
//               ></path>
//               <path
//                 fill="#EA4335"
//                 d="M24 46c5.87 0 10.9-1.93 15.39-5.61l-7.41-5.78c-2.34 1.56-5.28 2.5-8.6 2.5-7.01 0-12.97-4.7-15.16-11.13l-7.41 5.78C7.07 40.32 14.8 46 24 46z"
//               ></path>
//             </svg>
//             Google
//           </button>
//           <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path
//                 fill="#1877F2"
//                 d="M23.998 12C23.998 5.373 18.626 0 12 0 5.373 0 0 5.373 0 12c0 5.99 4.388 10.953 10.125 11.854v-8.387H7.078v-3.467h3.047V9.432c0-3.007 1.793-4.669 4.533-4.669 1.312 0 2.688.235 2.688.235v2.953h-1.51c-1.49 0-1.953.925-1.953 1.875v2.25h3.328l-.532 3.467h-2.796v8.387C19.61 22.953 24 17.99 24 12h-.002z"
//               ></path>
//             </svg>
//             Facebook
//           </button>
//         </div>
//         <p className="text-xs text-gray-500 text-center mt-6">
//           Protected by reCAPTCHA and subject to the Rhombus{" "}
//           <a href="#" className="text-blue-500 hover:text-blue-600">
//             Privacy Policy
//           </a>{" "}
//           and{" "}
//           <a href="#" className="text-blue-500 hover:text-blue-600">
//             Terms of Service
//           </a>
//           .
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SuperUserForm;
