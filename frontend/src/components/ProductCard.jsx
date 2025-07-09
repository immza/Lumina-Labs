// frontend/src/components/ProductCard.jsx
import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  IconButton,
  useToast,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea, // Import Textarea for description
  useColorModeValue,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useCartStore } from "../store/cart";
import { useProductStore } from "../store/product";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Ensure product has a description property for initial state
  const [updatedProduct, setUpdatedProduct] = useState({
    ...product,
    description: product.description || "", // Initialize description to empty string if null/undefined
  });

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const primaryButtonColorScheme = "blue";
  const primaryButtonHoverBg = useColorModeValue("blue.600", "blue.400");

  const updateButtonColorScheme = "purple";
  const updateButtonHoverBg = useColorModeValue("purple.50", "purple.900");

  const deleteIconColorScheme = "red";
  const deleteIconHoverBg = useColorModeValue("red.50", "red.900");

  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const productInCart = cart.find((item) => item._id === product._id);
  const currentQuantityInCart = productInCart ? productInCart.quantity : 0;

  useEffect(() => {
    // Update product state for modal form if the original product changes
    // Ensure description is also updated and defaults to empty string if not present
    setUpdatedProduct({
      ...product,
      description: product.description || "",
    });
  }, [product]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Product Added",
      description: `${product.name} has been added to the cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    increaseQuantity(product._id);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    decreaseQuantity(product._id);
  };

  const handleDeleteProduct = async (e, pid) => {
    e.stopPropagation();
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOpenUpdateModal = (e) => {
    e.stopPropagation();
    onOpen();
  };

  const handleUpdateProductSubmit = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );
    onClose();
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      onClick={handleCardClick}
      cursor="pointer"
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${parseFloat(product.price).toFixed(2)}
        </Text>

        {currentQuantityInCart === 0 ? (
          <Button
            onClick={handleAddToCart}
            colorScheme={primaryButtonColorScheme}
            w="full"
            variant="solid"
            _hover={{ bg: primaryButtonHoverBg, transform: "scale(1.01)" }}
            transition="all 0.2s ease-in-out"
          >
            Add to Cart
          </Button>
        ) : (
          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              icon={<FaMinus />}
              onClick={handleDecrease}
              colorScheme="red"
              variant="outline"
              isRound
              size="sm"
              isDisabled={currentQuantityInCart === 1}
              aria-label="Decrease quantity"
              _hover={{
                bg: useColorModeValue("red.50", "red.900"),
                borderColor: useColorModeValue("red.400", "red.500"),
              }}
            />
            <Text fontWeight="bold" color={textColor}>
              {currentQuantityInCart}
            </Text>
            <IconButton
              icon={<FaPlus />}
              onClick={handleIncrease}
              colorScheme="green"
              variant="outline"
              isRound
              size="sm"
              aria-label="Increase quantity"
              _hover={{
                bg: useColorModeValue("green.50", "green.900"),
                borderColor: useColorModeValue("green.400", "green.500"),
              }}
            />
          </Box>
        )}

        <HStack spacing={2} p={4}>
          <IconButton
            icon={<FaTrash />}
            onClick={(e) => handleDeleteProduct(e, product._id)}
            colorScheme={deleteIconColorScheme}
            variant="ghost"
            aria-label="Delete product"
            _hover={{ bg: deleteIconHoverBg }}
            transition="background 0.2s"
          />
          <Button
            leftIcon={<FaEdit />}
            onClick={handleOpenUpdateModal}
            colorScheme={updateButtonColorScheme}
            variant="outline"
            _hover={{ bg: updateButtonHoverBg }}
            transition="background 0.2s"
          >
            Update Product
          </Button>
        </HStack>
      </Box>

      {/* --- Update Product Modal --- */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
              {/* --- ADDED DESCRIPTION TEXTAREA HERE --- */}
              <Textarea
                placeholder="Product Description"
                name="description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
                rows={3} // Provide a default height for the textarea
              />
              {/* --- END ADDED DESCRIPTION TEXTAREA --- */}
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdateProductSubmit}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
