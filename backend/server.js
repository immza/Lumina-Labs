//const express = require('express');
import express from "express";
import dotenv from "dotenv";
import path from "path";
//import mongoose from 'mongoose';
import { connectDB } from "./config/db.js";
//import Product from './models/product.model.js';
import productRoutes from "./routes/product.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to use JSON data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

//mern-course
