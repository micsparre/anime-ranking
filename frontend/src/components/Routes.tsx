// src/components/Routes.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import UserAnime from "./common/UserList";
import Recommendations from "./pages/Recommendations";
import Bookmarks from "./pages/Bookmarks";
import Account from "./authentication/Account";
import Navbar from "./Navbar";
import SearchAnime from "./pages/SearchAnime";

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
        <Route
          path="/anime-list"
          element={!isLoggedIn ? <Navigate to="/login" /> : <UserAnime />}
        />
        <Route
          path="/bookmarks"
          element={!isLoggedIn ? <Navigate to="/login" /> : <Bookmarks />}
        />
        <Route
          path="/recommendations"
          element={!isLoggedIn ? <Navigate to="/login" /> : <Recommendations />}
        />
        <Route
          path="/account"
          element={isLoggedIn ? <Account /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<SearchAnime />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
export default AnimeRoutes;
