 import {responder} from "./../util.js"
 import Transaction from "../models/Transaction.js";

 const postApiTransaction= async (req, res) => {
    const { amount, type, description, category } = req.body;

    const transaction = new Transaction({
        amount,
        type,
        description,
        category
    });
    try {
        const saveTransaction = await transaction.save();
        responder({res,success:true,message:"Transaction is saved",data:saveTransaction})
    }
    catch (err) {
        responder({res,success:false,message:err.message,data:null})
    }
}

const getApiTransaction= (async (req, res) => {
    const allTransaction = await Transaction.find();
    responder({res,success:true,message:"Successfully FetchedTransaction ",data:allTransaction})
})
export {postApiTransaction,getApiTransaction};