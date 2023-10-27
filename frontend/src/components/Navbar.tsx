import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isLoggedIn = localStorage.getItem("token") !== null;
  return (
    <nav className="fixed top-0 w-full bg-blue-900 p-4 flex justify-between">
      <ul className="inline-block space-x-6 text-md flex-grow">
        <li className="inline-block">
          <Link
            to="/"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="inline-block">
              <div className="container mx-auto flex justify-between items-center">
                <div className="relative group">
                  <button
                    className="text-white group-hover:text-gray-300 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <div className="flex items-center">
                      <span>Lists</span>
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute mt-4 w-40 bg-white border rounded shadow-lg"
                    >
                      <ul>
                        <Link
                          to="/anime-list"
                          className=" transition duration-300"
                          onClick={toggleDropdown}
                        >
                          <li className="px-3 py-2 hover:bg-blue-100 hover:text-blue-300 cursor-pointer">
                            Your List
                          </li>
                        </Link>

                        <Link
                          to="/anime-list"
                          className="transition duration-300"
                          onClick={toggleDropdown}
                        >
                          <li className="px-3 py-2 hover:bg-blue-100 hover:text-blue-300 cursor-pointer">
                            Bookmarks
                          </li>
                        </Link>

                        <Link
                          to="/recommendations"
                          className="transition duration-300"
                          onClick={toggleDropdown}
                        >
                          <li className="px-3 py-2 hover:bg-blue-100 hover:text-blue-300 cursor-pointer">
                            Recommendations
                          </li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </>
        ) : (
          <> </>
        )}
      </ul>
      {isLoggedIn ? (
        <ul className="inline-block space-x-6 text-md">
          <li className="inline-block">
            <Link
              to="/account"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Account
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="inline-block space-x-6 text-md">
          <li className="inline-block">
            <Link
              to="/login"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Login
            </Link>
          </li>
          <li className="inline-block">
            <Link
              to="/register"
              className="text-white hover:text-blue-300 transition duration-300"
            >
              Sign up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
