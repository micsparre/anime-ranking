// src/components/Auth/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.post(apiUrl + '/api/login', credentials);

      if (response.status === 200) {
        // Successful login, handle authentication and redirection
        const data = response.data;
        // Store authentication token and redirect to a protected route
        // ...

        // For now, just log the response
        console.log('Successful login', data);
      } else {
        // Handle login error
        // ...
        console.log('Login error', response.data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          fullWidth
          margin="normal"
          value={credentials.username}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
