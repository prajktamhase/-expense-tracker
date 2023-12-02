import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { responder } from "./util.js"
import User from "./models/user.js"
import { postApiTransaction, getApiTransaction, deleteGetApi, getApiIdTransaction } from "./controllers/Transaction.js"
import Transaction from "./models/Transaction.js";
import FindUser from "./models/FindUser.js"

import path from 'path';

const __dirname = path.resolve();

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
        responder({ res, success: true, data: saveUser, message: "Signup Successfully" })
    }
    catch (e) {
        responder({ res, success: false, data: [], message: e.message })
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
    responder({ res, success: true, message: "Server is live", data: null })
})

//post Transaction
app.post('/api/transactions', postApiTransaction)

//get Transaction
app.get('/api/transactions', getApiTransaction)

app.get('/api/transactions/:_id', getApiIdTransaction)

//delete/transaction/:id
app.delete('/api/transaction/:_id', deleteGetApi)

app.put('/api/transactions/:_id', async (req, res) => {
    const { _id } = req.params;

    const { amount, type, description, category } = req.body;

    await Transaction.updateOne({ _id: _id }, {
        $set: {
            amount,
            type,
            description,
            category
        }
    });

    const updateTransaction = await Transaction.findOne({ _id: _id });

    res.json({
        success: true,
        data: updateTransaction,
        message: "Transaction updated successfully"

    });
});

app.delete('/api/transactions/:_id', async (req, res) => {
    const { _id } = req.params;
    const deleteTransaction = await Transaction.deleteOne({ _id: _id });

    res.json({
        success: true,
        data: deleteTransaction,
        message: "Transaction deleted successfully"
    })

})

app.post('/api/user', async (req, res) => {
    const { user, product} = req.body;
    
    //create instance
    const userfind = new FindUser ({
        user,
        product
    })

    try {
        const saveUser = await userfind.save();
        res.json({
            success: true,
            data: saveUser,
            message: "User Find created successfully"
        });
    }
    catch(e){
        res.json({
            success: false,
            message: e.message,
        });
    }
});

//get/user/:id
app.get('/api/users/user/:_id' ,async (req,res)=>{
    const {_id}=req.params;

    const users =  await FindUser.find({user:_id}).populate("user transaction");
    users.forEach((userfind)=>{
        userfind.user.password=undefined;
    })

    res.json({
        success: true,
        data: users,
        message: "User Fetched fetched successfully"
    });
})

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    });
  }

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
