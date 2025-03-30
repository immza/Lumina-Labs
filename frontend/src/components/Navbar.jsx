import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, Routes, Route } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
//import Navbar from "./components/Navbar";
//import HomePage from "./pages/HomePage"; // Assuming you have a HomePage component
//import CreatePage from "./pages/CreatePage"; // Assuming you have a CreatePage component
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
//import { useProductStore } from "../store/product";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  //const {products} = useProductStore;
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
          <Link to={"/"}>Ayan's CRUD Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default App;
