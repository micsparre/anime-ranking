// src/components/Auth/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '', email: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const apiUrl = 'http://localhost:8000/api/register'
    try {
      const response = await axios.post(apiUrl, user);

      if (response.status === 201) {
        // Successful registration, handle redirection or login
        // ...
      } else {
        // Handle registration error
        // ...
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          fullWidth
          margin="normal"
          value={user.username}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          margin="normal"
          value={user.password}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          fullWidth
          margin="normal"
          value={user.email}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
