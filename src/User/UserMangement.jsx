// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // Role filter state
  const [selectedStatus, setSelectedStatus] = useState(""); // Status filter state
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users list
  const [currentPage, setCurrentPage] = useState(1);
  // const usersPerPage = 5;
  const [usersPerPage, setUsersPerPage] = useState(5); // Default for laptops


  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/users/all")
      .then((response) => {
        const mappedUsers = response.data.filter(user => user.role_id !== 1).map((user) => ({
          fullName: user.name, // Mapping 'name' to 'fullName'
          email: user.email,
          roleName: user.userCategory, // Mapping 'userCategory' to 'roleName'
          userStatus: user.status, // Mapping 'status' to 'userStatus'
        }));
        setUsers(mappedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-[#DCFCE7] text-[#3E8358]";
      case "PENDING":
        return "bg-[#FEF9C3] text-[#9D6F32]";
      case "INACTIVE":
        return "bg-[#ECECED] text-[#4E5661]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = async (email) => {
    // Show confirmation alert
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to change the status of this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, change it!`,
    });

    if (result.isConfirmed) {
      try {
        // ✅ Making API call with email in URL
        const response = await axios.put(
          `http://localhost:8080/api/users/toggle-status/email/${email}`
        );

        console.log("Response from server:", response.data);

        // Show success message
        Swal.fire("Success!", `User has been changed successfully.`, "success");
        fetchUsers();
      } catch (error) {
        console.error(
          "Error toggling user status:",
          error.response ? error.response.data : error.message
        );

        // Show error alert
        Swal.fire(
          "Error!",
          "Something went wrong while updating the user status.",
          "error"
        );
        fetchUsers();
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  useEffect(() => {
    const updateUsersPerPage = () => {
      if (window.innerWidth < 768) {
        setUsersPerPage(7); // Show 7 rows on mobile
      } else {
        setUsersPerPage(5); // Show 5 rows on larger screens
      }
    };
  
    // Set initial value based on screen size
    updateUsersPerPage();
  
    // Listen for window resize events
    window.addEventListener("resize", updateUsersPerPage);
  
    return () => {
      window.removeEventListener("resize", updateUsersPerPage);
    };
  }, []);



  const handleEdit = (user) => {
    navigate("/edituser", { state: { user } });
  };

  useEffect(() => {
    let filtered = users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = selectedRole ? user.roleName === selectedRole : true;
      const matchesStatus = selectedStatus
        ? user.userStatus === selectedStatus
        : true;

      return matchesSearch && matchesRole && matchesStatus;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change

  }, [searchQuery, selectedRole, selectedStatus, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  
  return (
    <div className="h-full w-full">
      <div className="min-h-screen  bg-[#F5F5F5] p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {/* <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-black transform rotate-45 mr-2"></div> */}
            <button className="px-3 py-2 md:px-4 md:py-2 bg-[#848e86] text-white rounded-lg" onClick={() => navigate("/desktop/1")}>
              Back to desktop
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl text-[24px] font-bold mb-1">
              User Management
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage system users and their permissions
            </p>
          </div>
          <button
            className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 mt-4 md:mt-0"
            onClick={() => navigate("/inviteuser")}
          >
            <UserPlus size={20} />
            Invite User
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5 md:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80 lg:w-96 xl:w-1/2">
              <div className="flex items-center border rounded-lg w-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <div className="pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 35 35"
                    fill="none"
                    className="text-gray-400"
                  >
                    <path
                      d="M30.9375 29.4097L24.1781 22.6516C28.248 17.7654 27.7548 10.5422 23.0586 6.2545C18.3623 1.96677 11.1241 2.13127 6.62749 6.62792C2.13085 11.1246 1.96635 18.3627 6.25407 23.059C10.5418 27.7553 17.765 28.2484 22.6512 24.1785L29.4093 30.9379C29.8313 31.3599 30.5155 31.3599 30.9375 30.9379C31.3595 30.5159 31.3595 29.8317 30.9375 29.4097ZM5.33341 15.0538C5.33341 9.68563 9.6852 5.33384 15.0534 5.33384C20.4216 5.33384 24.7734 9.68563 24.7734 15.0538C24.7734 20.422 20.4216 24.7738 15.0534 24.7738C9.68767 24.7679 5.33936 20.4196 5.33341 15.0538Z"
                      fill="#A9AEB8"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="flex w-full gap-4 sm:w-auto">
              {/* Role Dropdown - Left on Mobile, Normal on Laptop */}
              <div className="w-1/2  sm:w-auto">
                <select
                  className="px-4  py-2 justify-center border rounded-lg bg-white w-full sm:w-auto"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Role</option>
                  <option value="SYSTEM">System</option>
                  <option value="USER">User</option>
                  {/* <option value="Support Admin">Support Admin</option> */}
                </select>
              </div>

              {/* Status Dropdown - Right on Mobile, Normal on Laptop */}
              <div className="w-1/2 sm:w-auto text-right">
                <select
                  className="px-4 py-2 border rounded-lg bg-white w-full sm:w-auto"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING">Pending</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border:rounded-lg border-gray-200 border-solid">
            <div className="max-h-[400px] md:max-h-none overflow-auto ">
              {" "}
              {/* Fixed height for 7 rows on mobile */}
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">
                      NAME
                    </th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">
                      EMAIL
                    </th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">
                      ROLE
                    </th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">
                      STATUS
                    </th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 text-sm">{user.fullName}</td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {user.email}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`${user.userStatus} px-3 bg-[#DBEAFE] text-[#4462BF] py-1 rounded-full text-[10px]`}
                          >
                            {user.roleName}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`${getStatusColor(
                              user.userStatus
                            )} px-3 py-1 rounded-full text-[10px]`}
                          >
                            {user.userStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            className="text-blue-500 hover:text-blue-600"
                            onClick={() => handleEdit(user)}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="text-red-500 ml-4 hover:text-red-600"
                            onClick={() => handleDelete(user.email)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-3 px-4 text-center text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className="flex justify-between mb-1 items-center w-full py-2 bg-white 
              md:static fixed bottom-0 left-0 right-0 p-4 border-t shadow-md ">
              <span className="text-[14px]">
                Showing {indexOfFirstUser + 1} to{" "}
                {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                {filteredUsers.length} entries
              </span>
              <div className="flex space-x-2">
                <button
                  className="border border-gray-300 text-gray-500 px-6 py-2 text-[16px] hover:text-gray-600 hover:border-gray-400 rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="border border-gray-300 text-gray-500 px-6 py-2 text-[16px] hover:text-gray-600 hover:border-gray-400 rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
