//import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
//import { PlusSquareIcon } from "@chakra-ui/icons";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage"; // Assuming you have a HomePage component
import CreatePage from "./pages/CreatePage"; // Assuming you have a CreatePage component
//import { IoMoon } from "react-icons/io5";
//import { LuSun } from "react-icons/lu";

function App() {
  //const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
