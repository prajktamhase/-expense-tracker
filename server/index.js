import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import {responder} from "./util.js"
import User from "./models/user.js"
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


//signup/post
app.post("/api/signup", async (req, res) => {
    const { name, email, password, mobile, address } = req.body;
    const user = new User({
        name,
        email,
        password,
        mobile,
        address
    });

    try {
        const saveUser = await user.save();
        responder({res, success:true , data:saveUser , message:"Signup Successfully"})
    }
    catch(e) {
        responder({res , success:false, data:[], message:e.message})
    }
});

//login/post (access data fron signup)
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const finduser = await User.findOne({
        email: email,
        password: password
    }).select('name mobile  address email')

    if (finduser) {
        return res.json({
            success: true,
            data: finduser,
            message: "Login successfully"
        })
    }
    else {
        return res.json({
            success: false,
            message: "Invalid data"
        })
    }
})


app.get('/api/health', async (req, res) => {
    responder({res,success:true,message:"Server is live" , data:null})   
})

app.post('/api/transactions', postApiTransaction)

app.get('/api/transactions',getApiTransaction )

app.delete('/api/transactions/:_id', async (req, res) => {
    const { _id } = req.params;
    await Tra.deleteOne({ _id: _id })
    res.json({
        success: true,
        data: {},
        message: `successfully deleted product ${_id}`
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
