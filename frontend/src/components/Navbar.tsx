import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./common/Dropdown";

interface NavbarProps {
  token: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ token }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = token !== null;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <nav className="fixed top-0 w-full bg-[#49392c] p-4 flex justify-center items-center min-w-96">
      <ul className="inline-block space-x-6 text-md flex-grow">
        <Link to="/" className="text-white transition duration-300">
          <li className="inline-block">Home</li>
        </Link>
        {isLoggedIn ? (
          <Dropdown
            toggleDropdown={toggleDropdown}
            showDropdown={showDropdown}
            dropdownRef={dropdownRef}
          />
        ) : (
          <> </>
        )}
      </ul>
      <div className="absolute text-white text-xl">jaku</div>
      {isLoggedIn ? (
        <ul className="inline-block space-x-6">
          <Link to="/account" className="text-white transition duration-300">
            <li className="inline-block">Account</li>
          </Link>
        </ul>
      ) : (
        <ul className="inline-block space-x-6">
          <Link to="/login" className="text-white transition duration-300">
            <li className="inline-block">Login</li>
          </Link>
          <Link to="/register" className="text-white transition duration-300">
            <li className="inline-block">Sign up</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
