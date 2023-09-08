// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RankingsPage, RecommendationsPage } from './components';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { themeLight, themeDark, ToggleTheme } from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const [light, setLight] = React.useState(!useMediaQuery('(prefers-color-scheme: dark)'));
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Router>
        <Container maxWidth="sm">
        {/* <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button> */}
          <ToggleTheme light={light} setLight={setLight}/>
          <main>
            <Routes>
              <Route path="/" element={<RankingsPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
            </Routes>
          </main>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
