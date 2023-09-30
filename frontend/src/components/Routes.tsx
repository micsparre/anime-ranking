// src/components/Routes.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AnimeList from "./AnimeList/AnimeList";
import Recommendation from "./AnimeList/Recommendation";
import Navbar from "./Shared/Navbar";
import Home from "./Home";

const AnimeRoutes: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/anime-list" element={<AnimeList />} />
      <Route path="/recommendations" element={<Recommendation />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default AnimeRoutes;
