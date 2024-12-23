import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

// Load environment variables
dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Database and Cloudinary connections
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize routes
app.use("/api/song", songRouter);
app.use("/api/list", songRouter);

// Root route
app.get("/", (req, res) => {
    res.send("Hello, This is the backend server");
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
