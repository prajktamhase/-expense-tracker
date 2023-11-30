import { responder } from "./../util.js"
import Transaction from "../models/Transaction.js";
import UserTransaction from "./../models/userTransaction.js"

const postApiTransaction = async (req, res) => {
    const { amount, type, description, category } = req.body;

    const transaction = new Transaction({
        amount,
        type,
        description,
        category
    });
    try {
        const saveTransaction = await transaction.save();
        responder({ res, success: true, message: "Transaction is saved", data: saveTransaction })
    }
    catch (err) {
        responder({ res, success: false, message: err.message, data: null })
    }
}

const getApiTransaction = (async (req, res) => {
    const allTransaction = await Transaction.find();
    responder({ res, success: true, message: "Successfully FetchedTransaction ", data: allTransaction })
})

const getApiIdTransaction = (async (req, res) => {
    const fetchedTransaction = await Transaction.findOne();
    responder({ res, success: true, message: "Successfully FetchedTransaction ", data: fetchedTransaction })
})


const deleteGetApi = async (req, res) => {
    const { _id } = req.params; 
    const deleteTransaction = await UserTransaction.deleteOne({ _id: _id });

    responder({ res, success: true, message: "Transaction deleted successfully", data: deleteTransaction })
}

export { postApiTransaction, getApiTransaction, deleteGetApi,getApiIdTransaction };