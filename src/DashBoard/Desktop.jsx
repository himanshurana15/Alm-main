// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Home, Users, Settings, User, Edit } from "lucide-react"; // Importing icons
import { useNavigate } from "react-router-dom";
// import CreateDebtInstrumentForm from "./CreateDebtInstrumentForm ";
// import * as Dialog from "@radix-ui/react-dialog";

import {
  ChevronDownIcon,
  SearchIcon,
  PlusIcon,
  DownloadIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Desktop = () => {
//   const [isOpen, setIsOpen] = useState(false);
  // Sample data for the debt instruments
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

  // State for dropdown visibility
  const [dropdowns, setDropdowns] = useState({
    instrumentType: false,
    lender: false,
    currency: false,
    maturityDate: false,
    status: false,
  });

    const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown) => {
    setDropdowns({
      ...dropdowns,
      [dropdown]: !dropdowns[dropdown],
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left sidebar - 1/4 width on medium screens, 1/5 on large screens */}
      <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800  text-white h-screen">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="relative w-8 h-8">
              <div className="absolute transform rotate-45 border-2 border-white w-6 h-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                ◆
              </div>
            </div>
            <span className="text-[14px] font-bold">Rhombus</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md transition"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/usermanagement"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md transition"
            >
              <Users size={20} />
              <span>User Management</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md transition"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md transition"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>

            <Link
              to="/edit-user"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md transition"
            >
              <Edit size={20} />
              <span>Edit User</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-2">
              <div className="text-right">
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
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-auto">
          <h1 className="text-[32px] font-semibold mb-2">
            Debt Instrument List
          </h1>

          {/* Search and actions bar */}
          <div className="flex flex-col md:flex-row justify-between gap-2 mb-2">
            <div className="relative w-full md:w-1/4">
              <input
                type="search"
                placeholder="Search"
                className="w-full pl-3 pr-10 py-1.5 text-sm border rounded-[20px]  border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <SearchIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={14}
              />
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-500 hover:bg-blue-600  border-2 border-blue-500 rounded-[20px]  text-white px-3 py-1.5 text-sm  flex items-center gap-1" onClick={() => navigate("/createdeptinstrumentform")}>
                <span>Create new Debt Instrument</span>
                <PlusIcon size={14} />
              </button>
              <button className="border border-gray-300 text-gray-700 px-3 py-1.5 text-sm rounded-[20px]  flex items-center gap-1">
                <span>Export (CSV)</span>
                <DownloadIcon size={14} />
              </button>
            </div>

          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "Debt Instrument Type",
              "Lender",
              "Currency",
              "Maturity Date",
              "Status",
            ].map((filter, index) => (
              <div key={index} className="relative">
                <button
                  className="flex items-center gap-1 border border-gray-300 text-sm px-2 py-1.5 rounded"
                  onClick={() => toggleDropdown(filter)}
                >
                  <span>{filter}</span>
                  <ChevronDownIcon size={14} />
                </button>
                {dropdowns.status && (
                  <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-300 rounded shadow-lg">
                    <div className="p-2">
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <input type="checkbox" id="active" />
                        <label htmlFor="active">Active</label>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                        <input type="checkbox" id="retired" />
                        <label htmlFor="retired">Retired</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-white">
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
              <tbody className="bg-white divide-y divide-gray-200">
                {debtInstruments.map((instrument) => (
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
          <div className="flex items-center justify-between border-t border-gray-200 px-2 py-2 mt-2 text-sm">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className="text-gray-700 hover:bg-gray-50 w-7 h-7 rounded-md flex items-center justify-center"
                >
                  {page}
                </button>
              ))}
              <button className="text-gray-700 hover:bg-gray-50 w-7 h-7 rounded-md flex items-center justify-center">
                <ChevronDownIcon className="rotate-270" size={12} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Desktop;
