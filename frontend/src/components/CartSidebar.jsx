import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Image,
  Box,
  Divider,
  // Removed useDisclosure from here as it's no longer needed for the sidebar's state
  Flex,
  IconButton,
} from "@chakra-ui/react";
// Updated useCartStore import to get sidebar state and actions
import { useCartStore } from "../store/cart";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import CheckoutModal from "./CheckoutModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react"; // Keep this import for CheckoutModal's useDisclosure

const CartSidebar = () => {
  // Get isSidebarOpen, openSidebar, closeSidebar from useCartStore
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
  } = useCartStore();

  // useDisclosure is now ONLY for the CheckoutModal
  const {
    isOpen: isCheckoutModalOpen,
    onOpen: onCheckoutModalOpen,
    onClose: onCheckoutModalClose,
  } = useDisclosure(); // Keep for Checkout Modal

  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to handle checkout click
  const handleCheckoutClick = () => {
    closeSidebar(); // Close the cart sidebar using the store action
    onCheckoutModalOpen(); // Open the checkout modal
  };

  // Function to handle "Shop More" click for empty cart
  const handleShopMoreClick = () => {
    closeSidebar();
    navigate("/");
  };

  return (
    <>
      <Button
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="blue"
        onClick={openSidebar}
        leftIcon={<MdShoppingCart />}
        boxShadow="lg"
        zIndex="overlay"
        display={{ base: "flex", md: "flex" }}
      >
        Cart ({cart.length})
      </Button>

      <Drawer
        isOpen={isSidebarOpen}
        placement="right"
        onClose={closeSidebar}
        finalFocusRef={null}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Your Shopping Cart
          </DrawerHeader>

          <DrawerBody>
            {cart.length === 0 ? (
              <VStack spacing={4} mt={10} textAlign="center">
                <Text fontSize="xl" fontWeight="bold" color="gray.500">
                  Your cart is empty!
                </Text>
                <MdShoppingCart size="40px" color="gray" />
                <Button colorScheme="blue" onClick={handleShopMoreClick}>
                  Start Shopping
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                {cart.map((item) => (
                  <Box
                    key={item._id}
                    p={3}
                    shadow="sm"
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <HStack spacing={4} align="center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box flex="1">
                        <Text fontWeight="semibold" fontSize="md">
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          ${item.price.toFixed(2)}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </Box>
                      <HStack>
                        <IconButton
                          size="sm"
                          icon={<FaMinus />}
                          onClick={() => decreaseQuantity(item._id)}
                          isDisabled={item.quantity === 1}
                        />
                        <Text fontWeight="bold">{item.quantity}</Text>
                        <IconButton
                          size="sm"
                          icon={<FaPlus />}
                          onClick={() => increaseQuantity(item._id)}
                        />
                      </HStack>
                      <IconButton
                        size="sm"
                        icon={<FaTrash />}
                        onClick={() => removeFromCart(item._id)}
                        colorScheme="red"
                        variant="ghost"
                      />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <VStack w="full" align="stretch">
              <HStack
                justifyContent="space-between"
                fontWeight="bold"
                fontSize="xl"
              >
                <Text>Total:</Text>
                <Text>${totalAmount.toFixed(2)}</Text>
              </HStack>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={clearCart}
                isDisabled={cart.length === 0}
              >
                Clear Cart
              </Button>
              <Button
                colorScheme="green"
                w="full"
                isDisabled={cart.length === 0}
                onClick={handleCheckoutClick}
              >
                Checkout
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={onCheckoutModalClose}
      />
    </>
  );
};

export default CartSidebar;
