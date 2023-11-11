import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"; // Assuming you have a ProductCard component to display each product
import { Box, Grid, Heading, Skeleton } from "@chakra-ui/react";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8082/api/inventory')
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box mt={"30px"} ml={"1%"} mr={"1%"} overflow={"hidden"}>
      <Heading mb={"15px"} mt={"30px"} size={"md"}>
        Products
      </Heading>
      {isLoading ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {/* Loading skeleton or placeholder */}
          {[1, 2, 3].map((index) => (
            <Skeleton key={index} startColor="blue.100" endColor="blue.600" height="20px" />
          ))}
        </Grid>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.productName}
              real_price={`Rs. ${product.unitPrice}`}
            //   description={product.description}
              image="https://via.placeholder.com/150" // Placeholder image URL
              // Add other relevant product information here
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductDisplay;
