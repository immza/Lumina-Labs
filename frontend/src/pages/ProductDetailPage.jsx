import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  useToast,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react"; // Added VStack
import { useParams, useNavigate } from "react-router-dom"; // <--- Import useNavigate
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { useCartStore } from "../store/cart";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate(); // <--- Initialize useNavigate

  useEffect(() => {
    const loadProduct = async () => {
      if (products.length === 0) {
        await fetchProducts();
      }

      const foundProduct = products.find((prod) => prod._id === id);

      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        toast({
          title: "Error",
          description: "Product not found!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      setLoading(false);
    };

    loadProduct();
  }, [id, products, fetchProducts, toast]);

  const productInCart = cart.find((item) => item._id === product?._id);
  const currentQuantityInCart = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Product Added",
        description: `${product.name} has been added to the cart.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleIncrease = () => {
    if (product) {
      increaseQuantity(product._id);
    }
  };

  const handleDecrease = () => {
    if (product) {
      decreaseQuantity(product._id);
    }
  };

  // <--- NEW: Handler for Continue Shopping
  const handleContinueShopping = () => {
    navigate("/"); // Navigate to the home page (root path)
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>Product not found!</Text>;
  }

  return (
    <Box maxW="container.sm" py={12} mx="auto">
      <Heading as="h2" size="xl" mb={4}>
        {product.name}
      </Heading>
      <Image src={product.image} alt={product.name} mb={4} />
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        ${product.price}
      </Text>
      <Text mb={4}>{product.description}</Text>
      {/* Grouping action buttons in a VStack for vertical layout */}
      <VStack spacing={4} align="stretch">
        {" "}
        {/* <--- Added VStack here */}
        {currentQuantityInCart === 0 ? (
          <Button colorScheme="blue" onClick={handleAddToCart} w="full">
            {" "}
            {/* Set width to full */}
            Add to Cart
          </Button>
        ) : (
          <HStack spacing={2} w="full" justifyContent="space-between">
            {" "}
            {/* Adjusted HStack for better spacing */}
            <IconButton
              icon={<FaMinus />}
              onClick={handleDecrease}
              colorScheme="red"
              isRound
              size="md"
              isDisabled={currentQuantityInCart === 1}
            />
            <Text fontSize="lg" fontWeight="bold">
              {currentQuantityInCart}
            </Text>
            <IconButton
              icon={<FaPlus />}
              onClick={handleIncrease}
              colorScheme="green"
              isRound
              size="md"
            />
            {/* Removed the "Add More" button as requested, the "+" does the job */}
            <Button colorScheme="blue" onClick={handleAddToCart}>
              Add Another
            </Button>
          </HStack>
        )}
        {/* <--- NEW: Continue Shopping Button */}
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={handleContinueShopping}
          w="full"
        >
          Continue Shopping
        </Button>
      </VStack>{" "}
      {/* <--- Closed VStack */}
    </Box>
  );
};

export default ProductDetailPage;
