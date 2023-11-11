import { Box, Flex, List, ListIcon, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

const SingleHomeCard = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8082/api/inventory/?productid=${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("Error fetching Data");
      });
  }, [id]);

  // Sample image URL for the product
  const sampleImage = 'https://via.placeholder.com/150';

  return (
    <Box bg="#eef6f9" p="2rem">
      <Flex alignItems="center" bg="white">
        <Box w="60%">
          <img width="70%" src={sampleImage} alt={id} />
        </Box>
        <Box lineHeight="3rem" bg="white">
          <Text fontSize="3xl">{product.productName}</Text>
          <Flex gap={2} justifyContent="left" alignItems="center">
            <Text as="b" fontSize="2xl">{`Rs. ${product.unitPrice}`}</Text>
            {/* <Text fontSize="md" as="del">Sample Original Price</Text> */}
            {/* <Text fontSize="xl" color="#4ca8b6">Sample Discount</Text> */}
          </Flex>
          <UnorderedList color="gray.400">
            
            <ListItem>Description: {product.description}</ListItem>
            <ListItem>Stock : {product.stockQuantity}</ListItem>
          </UnorderedList>
          <Flex gap={5}>
            <button
              style={{
                color: '#ff7856',
                width: '200px',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: '2px solid #ff7856'
              }}
              onClick={() => {} /* Handle Cart */}
            >
              ADD TO CART
            </button>
            <button
              style={{
                color: 'white',
                width: '200px',
                height: '50px',
                backgroundColor: '#ff7856',
                borderRadius: '10px'
              }}
            >
              BUY NOW
            </button>
          </Flex>
          <List>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Sample Feature 1
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Sample Feature 2
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Sample Feature 3
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleHomeCard;
