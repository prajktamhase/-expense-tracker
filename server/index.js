import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import getApiTransaction from "./../server/util.js"
import Transaction from "./models/Transaction.js";
dotenv.config();

const app = express();

app.use(express.json());

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    if (connection) {
        console.log('MongoDB Connected....💖')
    }
}
connectDB();

app.get('/api/health', async (req, res) => {
    res.json({
        success: true,
        message: "server is rinning"
    })
})

app.post('/api/transaction', getApiTransaction)

app.get('/api/transactions', async (req, res) => {
    const allTransaction = await Transaction.find();

    res.json({
        success: true,
        message: "Successfully fetched all transaction",
        data: allTransaction,
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
