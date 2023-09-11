// src/App.tsx

import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { themeLight, themeDark, ToggleTheme } from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import AnimeRoutes from './components/Routes';

function App() {
  const [light, setLight] = React.useState(!useMediaQuery('(prefers-color-scheme: dark)'));
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Container maxWidth="sm">
        <main>
          <AnimeRoutes light={light} setLight={setLight}/>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
