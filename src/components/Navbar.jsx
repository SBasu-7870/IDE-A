import React from "react";
import Logo from "../assets/IDE-A.svg";

function Navbar() {
  return (
    <nav className="bg-transparent px-2 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white text-xl font-semibold ml-2">
              <img src={Logo} alt="logo" style={{height:50, width:50}}/> 
            </span>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-900 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
