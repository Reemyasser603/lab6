const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./Routes/products");
const userRouter = require("./Routes/users");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/products", (req, res, next) => {
  console.log("Received request on /products", req.method, req.body); // Log request method and body
  next();
}, productRouter);

app.use("/users", (req, res, next) => {
  console.log("Received request on /users", req.method); // Log request method
  next();
}, userRouter);

// Database Configuration
const db_name = "lab2";
const db_url = `mongodb://127.0.0.1:27017/${db_name}`;

mongoose
  .connect(db_url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => {
    console.error("MongoDB connection error:", e);
  });

// Handle Invalid Routes
app.use((req, res) => {
  console.log("Invalid route accessed:", req.originalUrl);
  res.status(404).send("404 - Resource Not Found");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
