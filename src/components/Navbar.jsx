import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-800 px-2 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white text-xl font-semibold ml-2">
              My App
            </span>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
