import mongoose from "mongoose";
import express  from "express";
import dotenv from 'dotenv';
dotenv.config();

const app=express();

app.use(express.json());

const connectDB=async()=>{
const connection= await mongoose.connect(process.env.MONGO_URI);

if(connection){
    console.log('MongoDB Connected....💖')
}
}
connectDB();




const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server is running on ${PORT}`)
})
