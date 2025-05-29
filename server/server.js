import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js'
import dashRoutes from './routes/dashboard.js'
import gamesRoutes from './routes/games.js'

dotenv.config()

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

// allows everything
app.use(cors({ origin: '*', credentials: true }));

app.use("/api/auth", authRoutes)
app.use("/api/dashboard", dashRoutes)
app.use("/api/games", gamesRoutes)

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000')
});

