import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { FaRegSadCry } from "react-icons/fa";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Current Products</span>
          </div>
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            No Products Found
            <FaRegSadCry style={{ marginLeft: "8px" }} />
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
