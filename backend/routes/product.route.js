import express from "express";
//import mongoose from "mongoose";
//import Product from './../models/product.model.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
//import { create } from 'zustand';
const router = express.Router();


router.get("/", getProducts);
router.put("/:id", updateProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);


//Postman

//console.log(process.env.MONGO_URI);




export default router;