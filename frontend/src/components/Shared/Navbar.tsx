import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  return (
    <nav className="fixed top-0 w-full bg-blue-900 p-4 flex justify-between">
      <ul className="inline-block space-x-6">
        <li className="inline-block">
          <Link
            to="/"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Home
          </Link>
        </li>
        <li className="inline-block">
          <Link
            to="/anime-list"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Anime List
          </Link>
        </li>
        <li className="inline-block">
          <Link
            to="/recommendations"
            className="text-white hover:text-blue-300 transition duration-300"
          >
            Recommendations
          </Link>
        </li>
      </ul>
      {isLoggedIn ? (
        <ul className="inline-block space-x-6">
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
        <ul className="inline-block space-x-6">
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
