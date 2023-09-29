import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: "black", color: "white" }}>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
          padding: "0",
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/anime-list"
            style={{ color: "white", textDecoration: "none" }}
          >
            Anime List
          </Link>
        </li>
        <li>
          <Link
            to="/recommendations"
            style={{ color: "white", textDecoration: "none" }}
          >
            Recommendations
          </Link>
        </li>
        <li
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "8px",
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
