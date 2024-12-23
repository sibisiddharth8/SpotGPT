import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware

app.use(cors());
app.use(express.json());

//initializing routes
app.use("/api/song", songRouter);
app.use("/api/list", songRouter);

app.get('/', (req, res) => {
    res.send('Hello, This is the backend server');
});

app.listen(port, console.log(`Server started on ${port}`));