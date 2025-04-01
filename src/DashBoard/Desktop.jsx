// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Home, Users, Settings, User, Edit, Menu, X } from "lucide-react"; // Importing icons
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import { Home, Users, Settings, User, Edit, Menu, X } from "lucide-react";
import {
  ChevronDownIcon,
  SearchIcon,
  PlusIcon,
  DownloadIcon,
} from "lucide-react";
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const Desktop = () => {
 
    const [menuHierarchy, setMenuHierarchy] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  const debtInstruments = [
    {
      id: "A",
      name: "Corporate Bond A",
      type: "Corporate Bond",
      lender: "Bank of America",
      currency: "USD",
      principalAmount: "$630.44",
      outstandingPrincipal: "$739.65",
      status: "Active",
    },
    {
      id: "B",
      name: "Government Bond B",
      type: "Government Bond",
      lender: "JP Morgan",
      currency: "EUR",
      principalAmount: "214.27 €",
      outstandingPrincipal: "95.38 €",
      status: "Retired",
    },
    {
      id: "C",
      name: "Municipal Bond C",
      type: "Municipal Bond",
      lender: "Wells Fargo",
      currency: "JPY",
      principalAmount: "Rp240.00",
      outstandingPrincipal: "RP2800.00",
      status: "Active",
    },
    {
      id: "D",
      name: "Corporate Bond D",
      type: "Corporate Bond",
      lender: "HSBC",
      currency: "GBP",
      principalAmount: "93.000 vnd",
      outstandingPrincipal: "79.000 vnd",
      status: "Active",
    },
    {
      id: "E",
      name: "Treasury Bond E",
      type: "Treasury Bond",
      lender: "Citibank",
      currency: "USD",
      principalAmount: "$105.55",
      outstandingPrincipal: "$406.27",
      status: "Active",
    },
    {
      id: "F",
      name: "Corporate Bond F",
      type: "Corporate Bond",
      lender: "Deutsche Bank",
      currency: "CHF",
      principalAmount: "$650,000",
      outstandingPrincipal: "$540,000",
      status: "Retired",
    },
    {
      id: "G",
      name: "Convertible Bond G",
      type: "Convertible Bond",
      lender: "Barclays",
      currency: "USD",
      principalAmount: "₹6.98",
      outstandingPrincipal: "₹7.10",
      status: "Retired",
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: "",
    lender: "",
    currency: "",
    status: "",
  });

  const handleFilterChange = (filter, value) => {
    setSelectedFilters({ ...selectedFilters, [filter]: value });
  };

  const uniqueValues = (key) => [
    ...new Set(debtInstruments.map((item) => item[key])),
  ];

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  // Filter instruments
  const filteredInstruments = debtInstruments.filter(
    (instrument) =>
      instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilters.type
        ? instrument.type === selectedFilters.type
        : true) &&
      (selectedFilters.lender
        ? instrument.lender === selectedFilters.lender
        : true) &&
      (selectedFilters.currency
        ? instrument.currency === selectedFilters.currency
        : true) &&
      (selectedFilters.status
        ? instrument.status === selectedFilters.status
        : true)
  );

  // Paginate the filtered instruments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedInstruments = filteredInstruments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredInstruments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  const fetchMenuHierarchy = async (roleId) => {
    const url = `http://localhost:8080/api/menu/role/${roleId}`; // Correct path parameter usage
    console.log("Fetching Menu Hierarchy from:", url);
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch menus. HTTP Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Received Menu Hierarchy Data:", data);
  
      setMenuHierarchy(data); // Directly setting the response as it already contains subMenus
    } catch (error) {
      console.error("Error fetching menu hierarchy:", error);
    }
  };

  // useEffect to check token expiration on component mount
  useEffect(() => {
    console.log("Checking token expiration on component mount.");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        console.warn("Token has expired. Logging out.");
        logoutHandler();
      } else {
        try {
          const decodedToken = jwtDecode(token);
          const roleId = decodedToken.roleId;

          if (roleId) {
            console.log("Fetching menu hierarchy for roleId:", roleId);
            fetchMenuHierarchy(roleId);
          } else {
            console.warn("Role ID is undefined in token!");
          }
        } catch (error) {
          console.error("Invalid token or decoding error:", error);
        }
      }
    } else {
      console.warn("No token found in storage!");
    }
  }, []);
  
  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };


  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  const isSessionActive = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/session/check-status/${sessionId}`
      );
      const isActive = await response.json();
      return isActive; // Returns `true` if session is still active
    } catch (error) {
      console.error("Error checking session status:", error);
      return false; //  Assume session expired if API fails
    }
  };

  const closeSession = async (sessionId) => {
    try {
      console.log("Closing session with session ID:", sessionId);
      await fetch(`http://localhost:8080/api/session/close/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error closing session:", error);
    }
  };

  const logoutHandler = async () => {
    console.log("Logging out...");
    const sessionId = localStorage.getItem("sessionId");

    if (sessionId) {
      await closeSession(sessionId);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("sessionId");
    sessionStorage.removeItem("token");

    navigate("/");
  };

  const reactivateSession = async (sessionId, logoutHandler) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/session/reactivate/${sessionId}`
      );

      if (response.status === 200) {
        Swal.fire("Success", "Session reactivated!", "success");
      } else {
        Swal.fire("Error", "Failed to reactivate session", "error");
        logoutHandler(); // Call logout function if reactivation fails
      }
    } catch (error) {
      console.error("Error reactivating session:", error);
      Swal.fire("Error", "Something went wrong", "error");
      logoutHandler();
    }
  };

  const handleUserActivity = async () => {
    console.log("User activity detected, checking session...");

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const sessionId = localStorage.getItem("sessionId");

    if (!token || isTokenExpired(token)) {
      console.warn("Token expired. Showing popup...");

      Swal.fire({
        title: "Session Expired",
        text: "Your session has expired. Do you want to reactivate it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Reactivate",
        cancelButtonText: "End Session",
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("Reactivating session...");
          await reactivateSession(sessionId);
        } else {
          console.warn("Session closed. Logging out...");
          logoutHandler();
        }
      });

      return;
    }

    if (sessionId) {
      const sessionActive = await isSessionActive(sessionId);
      if (!sessionActive) {
        console.warn("Session closed. Showing popup...");

        Swal.fire({
          title: "Session Ended",
          text: "Your session has been closed. Do you want to reactivate it?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Reactivate",
          cancelButtonText: "End Session",
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log("Reactivating session...");
            await reactivateSession(sessionId);
          } else {
            console.warn("Session closed. Logging out...");
            logoutHandler();
          }
        });

        return;
      }
    }
  };

  useEffect(() => {
    console.log("Session check started...");
    handleUserActivity();

    const interval = setInterval(() => {
      handleUserActivity();
    }, 5000); // *Check every 5 sec*

    return () => clearInterval(interval);
  }, []);

  const recordActivity = async (activityType, activityDesc) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      console.log(userId);

      if (!userId) {
        console.error("User ID not found in token");
        return;
      }

      let sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        sessionId = `${userId}-session-${Date.now()}`;
        localStorage.setItem("sessionId", sessionId);
      }

      console.log("Using session ID:", sessionId);

      // Append all parameters in the URL as query parameters
      const url = `http://localhost:8080/api/activity/record?sessionId=${encodeURIComponent(
        sessionId
      )}&userId=${encodeURIComponent(userId)}&activityType=${encodeURIComponent(
        activityType
      )}&activityDesc=${encodeURIComponent(activityDesc)}`;

      console.log("Final request URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (response.ok) {
        console.log("Activity logged successfully");
      } else {
        console.error("Failed to log activity:", responseData);
      }
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left sidebar - 1/4 width on medium screens, 1/5 on large screens */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-gray-700 text-white w-64 transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-1/4 lg:w-1/5 h-screen`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-1 mb-1">
            <img
              src="/ALM LOGO DARK.png"
              alt="Logo"
              className="w-35 h-20 object-contain"
            />
          </div>

          <nav>
            <ul className="space-y-2">
              {menuHierarchy && menuHierarchy.length > 0 ? (
                menuHierarchy.map((menu) => (
                  <li key={menu.menuId}>
                    <div
                      className="flex items-center justify-between py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
                      onClick={() => {
                        toggleMenu(menu.menuId);
                        recordActivity(
                          "MENU_CLICK",
                          `User clicked on ${menu.visibleName}`
                        );
                      }}
                    >
                      <span>{menu.visibleName}</span>
                      {menu.subMenus && menu.subMenus.length > 0 && (
                        <span>{openMenus[menu.menuId] ? "▲" : "▼"}</span>
                      )}
                    </div>

                    {menu.subMenus &&
                      menu.subMenus.length > 0 &&
                      openMenus[menu.menuId] && (
                        <ul className="pl-6 mt-1 space-y-1">
                          {menu.subMenus.map((submenu) => (
                            <li
                              key={submenu.menuId}
                              className="py-1 px-3 hover:bg-gray-600 rounded-md"
                              onClick={() => {
                                toggleMenu(submenu.menuId);
                                recordActivity(
                                  "SUBMENU_CLICK",
                                  `User clicked on ${submenu.visibleName}`
                                );
                              }}
                            >
                              <span>{submenu.visibleName}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 px-4">No menu available</li>
              )}
            </ul>
          </nav>
        
        </div>
      </div>
      {/* </div> */}

      {/* Click outside to close sidebar (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar - Now includes Menu Button and Profile on Mobile */}
        <header className="bg-gray-200 border-b border-gray-200 px-6 py-2 flex items-center w-full">
          {/* Sidebar Toggle Button (Visible on Mobile) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Push profile to the right */}
          <div className="ml-auto flex items-center gap-2">
            <div className="text-right hidden md:block">
              <div className="font-medium">Andrew Johnson</div>
              <div className="text-sm text-gray-500">
                andrew.johnson@gmail.com
              </div>
            </div>
            <div className="bg-gray-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
              <span>AJ</span>
            </div>
            <ChevronDownIcon size={16} className="text-gray-500" />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto bg-gray-100">
          <h1 className="text-[32px] font-semibold mb-2">
            Debt Instrument List
          </h1>

          {/* Search and actions bar */}
          <div className="flex flex-col md:flex-row justify-between gap-2 mb-2">
            <div className="relative w-full md:w-1/4">
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-1.5 text-sm border rounded-[20px]  border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <SearchIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
            </div>

            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600  border-2 border-blue-500 rounded-[20px]  text-white px-3 py-1.5 text-sm  flex items-center gap-1"
                // onClick={() => navigate("/multistepform")}
                onClick={() => {
                  recordActivity(
                    "CREATE_DEPT_INSTRUMENT",
                    "User clicked on Create New Dept Instrument button"
                  );
                  navigate("/multistepform");
                }}
              >
                <span>Create new Debt Instrument</span>
                <PlusIcon size={14} />
              </button>
              <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded-[20px]  flex items-center gap-1">
                <span onClick={() => recordActivity("DOWNLOAD", "tyfv")}>
                  Export (CSV)
                </span>
                <DownloadIcon size={14} />
              </button>
            </div>
          </div>

          {/* Filter buttons */}

          <div className="flex flex-wrap gap-2 mb-4">
            {["type", "lender", "currency", "status"].map((filter) => (
              <select
                key={filter}
                className="border border-gray-300 px-2 m-2 py-1.5 rounded-[20px]"
                value={selectedFilters[filter]}
                onChange={(e) => handleFilterChange(filter, e.target.value)}
              >
                <option value="">
                  All {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
                {uniqueValues(filter).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Instrument Name/ID",
                    "Type",
                    "Lender",
                    "Currency",
                    "Principal",
                    "Outstanding",
                    "Status",
                  ].map((heading, index) => (
                    <th
                      key={index}
                      className="px-2 py-2 text-left font-medium text-gray-500 uppercase"
                    >
                      <div className="flex items-center gap-1">
                        {heading}
                        <ChevronDownIcon size={12} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-200">
                {paginatedInstruments.map((instrument) => (
                  <tr key={instrument.id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 whitespace-nowrap">
                      {instrument.name}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      {instrument.type}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      {instrument.lender}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      {instrument.currency}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      {instrument.principalAmount}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      {instrument.outstandingPrincipal}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          instrument.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {instrument.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-start border-t border-gray-200 px-2 py-2 mt-2 text-sm">
            <div className="flex mt-3 items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 rounded-md flex items-center justify-center ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Desktop;
