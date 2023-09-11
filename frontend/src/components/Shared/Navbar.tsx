// src/components/Shared/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { ToggleTheme } from '../../theme'; // Import your ToggleTheme component
import { ThemeProps } from './Types'

const styles = {
  loginRegister: {
    marginLeft: 'auto', // Push Login/Register links to the right
  },
};

const Navbar: React.FC<ThemeProps> = ({ light, setLight }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
            <Typography variant="h6">
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Home
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Link to="/anime-list" style={{ color: 'white', textDecoration: 'none' }}>
                Anime List
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Link to="/recommendations" style={{ color: 'white', textDecoration: 'none' }}>
                Recommendations
              </Link>
            </Typography>
          </Grid>
          <Grid item style={styles.loginRegister}>
            <Typography variant="h6">
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Register
              </Link>
            </Typography>
          </Grid>
          {/* Add more navigation links */}
          <Grid item>
            {/* Include your ToggleTheme component */}
            <ToggleTheme light={light} setLight={setLight} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
