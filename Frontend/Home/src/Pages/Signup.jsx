import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('CUSTOMER');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users', {
        username,
        email,
        password,
        userRole,
        address,
        contactNo,
      });

      if (response.status === 200) {
        // Perform actions based on successful signup
        // For example, navigate to the login page or any other action
        navigate('/login');
      }
    } catch (error) {
      setError('Unable to complete signup. Please try again.');
    }
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" width="50vw">
        <Text fontSize="2xl" mb={4}>
          User Signup
        </Text>
        <Input
          placeholder="Username"
          mb={4}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Input
          placeholder="Address"
          mb={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          placeholder="Contact Number"
          mb={4}
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="blue" onClick={handleSignup}>
          Sign Up
        </Button>
        <Text mt={4}>
          Already have an account? <Link to="/login">Login here</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Signup;
