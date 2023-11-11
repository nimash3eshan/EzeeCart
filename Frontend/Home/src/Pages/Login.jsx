import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      // Check for a valid response (status 200) from the API
      if (response.status === 200) {
        // Perform actions based on successful login
        // For example, store the token in local storage
        localStorage.setItem('token', response.data);

        // Navigate to the payment page or any authorized page
        navigate('/payment');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" width="50vw">
        <Text fontSize="2xl" mb={4}>
          User Login
        </Text>
        <Input
          placeholder="Email"
          mb={4}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          mb={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
        <Text mt={4}>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
