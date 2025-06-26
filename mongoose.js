import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/connect.js";
import router from "./routers/userRoute.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount routes properly — no space!
app.use("/api", router);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`🚀 Server is running at http://localhost:3000`);
});
