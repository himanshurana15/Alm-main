

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Search, UserPlus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // Role filter state
  const [selectedStatus, setSelectedStatus] = useState(""); // Status filter state
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users list

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/all")
      .then((response) => {
        console.log("Fetched Users:", response.data);
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially set filtered users to all users
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Determine status badge colors
  // Determine status badge colors
const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-[#DCFCE7] text-[#3E8358]";
    case "pending":
      return "bg-[#FEF9C3] text-[#9D6F32]";
    case "inactive":
      return "bg-[#ECECED] text-[#4E5661]";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

  // Edit user function

  const handleEdit = (user) => {
    navigate("/edituser", { state: { user } }); // Pass user data to EditUser page
  };
  

  // 🔹 Filtering Logic
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
  }, [searchQuery, selectedRole, selectedStatus, users]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-black transform rotate-45 mr-2"></div>
          <span className="text-lg md:text-xl font-medium">Rhombus</span>
        </div>
      </div>

      {/* Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">
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

      {/* Search & Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex justify-between mb-6">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="px-4 py-2 border rounded-lg bg-white w-full sm:w-auto"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Role</option>
              <option value="System Admin">System Admin</option>
              <option value="Course Admin">Course Admin</option>
              <option value="Support Admin">Support Admin</option>
            </select>

            <select
              className="px-4 py-2 border rounded-lg bg-white w-full sm:w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* User List Table */}
        <div className="overflow-x-auto border:rounded-lg border-gray-200 border-solid">
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-sm">{user.fullName}</td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">{user.roleName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`${getStatusColor(
                          user.userStatus
                        )} px-3 py-1 rounded-full text-sm`}
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
                      <button className="text-red-500 hover:text-red-600">
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
      </div>
    </div>
  );
};

export default UserManagement;
