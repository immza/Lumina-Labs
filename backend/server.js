//const express = require('express');
import express from 'express';
import dotenv from "dotenv";
//import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
//import Product from './models/product.model.js';
import productRoutes from "./routes/product.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000


app.use(express.json()); //allows us to use JSON data in the req.body




app.use("/api/products",productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});

//mern-course