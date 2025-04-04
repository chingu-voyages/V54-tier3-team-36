import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`)
});

