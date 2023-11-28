import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import {responder} from "./util.js"
import {postApiTransaction,getApiTransaction} from"./controllers/Transaction.js"


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

    responder({res,success:true,message:"Server is live" , data:null})
    
})

app.post('/api/transaction', postApiTransaction)

app.get('/api/transactions',getApiTransaction )

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
