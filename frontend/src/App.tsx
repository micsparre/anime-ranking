// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, RankingsPage, RecommendationsPage, Header } from './components';
// import './App.css';
import Container from '@mui/material/Container';

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
          </Routes>
        </main>
      </Container>
    </Router>
  );
}

export default App;
