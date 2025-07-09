import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast, // For success/error messages
} from "@chakra-ui/react";
import { useCartStore } from "../store/cart"; // To clear the cart after checkout

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, clearCart } = useCartStore(); // Get cart items and clearCart action
  const toast = useToast();

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Simulate order placement
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!formData.name || !formData.email || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate order placement
    console.log("--- Order Placed ---");
    console.log("Customer Details:", formData);
    console.log("Ordered Items:", cart);
    console.log(
      "Total Amount:",
      cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
    console.log("--------------------");

    // Show success toast
    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully. Thank you!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Clear the cart
    clearCart();

    // Reset form fields
    setFormData({
      name: "",
      email: "",
      address: "",
    });

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="address"
                placeholder="Your Shipping Address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isDisabled={cart.length === 0}
          >
            Place Order
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutModal;
