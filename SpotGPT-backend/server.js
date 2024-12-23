import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//app config
const app = express();
const port = process.env.PORT || 4000;

// middleware

app.use(cors());
app.use(express.json());

//initializing routes

app.get('/', (req, res) => {
    res.send('Hello, This is the backend server');
});

app.listen(port, console.log(`Server started on ${port}`));