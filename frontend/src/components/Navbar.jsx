import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  Text,
  useColorMode, // <--- Keep useColorMode here
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Only Link is needed here
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaStore } from "react-icons/fa";

// <--- NEW: Import useCartStore for the openSidebar action
import { useCartStore } from "../store/cart"; // Correct path from components/ to store/

// This is the actual Navbar component
function Navbar() {
  // Renamed from 'App' to 'Navbar' for clarity
  const { colorMode, toggleColorMode } = useColorMode(); // <--- Keep useColorMode here
  const { openSidebar } = useCartStore(); // <--- NEW: Get openSidebar action

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: 22, sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          {/* The Link component containing the icon and text */}
          <Link to={"/"}>
            <FaStore style={{ marginRight: "8px" }} /> {/* The icon */}
            🧪 Lumina Labs
          </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>

          {/* NEW: Cart Button that opens the sidebar */}
          <Button onClick={openSidebar}>
            {" "}
            {/* No comment issue here, inside JSX directly */}
            Cart
          </Button>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar; // Export Navbar
