// src/components/Routes.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AnimeList from "./AnimeList/AnimeList";
import Recommendation from "./AnimeList/Recommendation";
import Account from "./Auth/Account";
import Navbar from "./Navbar";
import Home from "./Home";

const AnimeRoutes: React.FC = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/anime-list" element={<AnimeList />} />
        <Route path="/recommendations" element={<Recommendation />} />
        <Route
          path="/account"
          element={isLoggedIn ? <Account /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
export default AnimeRoutes;
