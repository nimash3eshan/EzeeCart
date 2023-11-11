import React, { useState, useEffect } from 'react';
import { Text, Box, Button, Image, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);

      const getUserDetails = async () => {
        try {
          const tokenVerification = await axios.get(`http://localhost:8080/api/users/validateToken/${token}`);

          if (tokenVerification.data.Token === 'valid') {
            const userId = tokenVerification.data.UserId;
            const userDetails = await axios.get(`http://localhost:8080/api/users/${userId}`);
            setUser(userDetails.data);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      getUserDetails();
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <Box>
      {isLoggedIn ? (
        <Button variant="link" colorScheme="teal" onClick={onOpen}>
          <MdAccountCircle size={25} />
        </Button>
      ) : (
        <Box>
          <Link to="./login">
            <Button colorScheme="green">Login</Button>
          </Link>
          <Link to="./signup">
            <Button colorScheme="blue">Sign Up</Button>
          </Link>
        </Box>
      )}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">User Profile</DrawerHeader>
          <DrawerBody textAlign="center">
            {user ? (
              <Box>
                <Image
                  margin="auto"
                  borderRadius="full"
                  border="2px solid #f58014"
                  boxSize="120px"
                  src="https://iili.io/Jqq8OLx.png"
                />
                <Box mt={4}>
                  <Text fontSize="lg" fontWeight="semibold">
                    Welcome, {user.username}
                  </Text>
                  <Text fontSize="sm">{user.email}</Text>
                  <Text fontSize="sm">Role: {user.userRole}</Text>
                  <Text fontSize="sm">Address: {user.address}</Text>
                  <Text fontSize="sm">Contact No: {user.contactNo}</Text>
                </Box>
                <Button colorScheme="red" mt={4} onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Text>Loading...</Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Profile;
