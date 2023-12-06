import { responder } from "./../util.js"
import Transaction from "../models/Transaction.js";


const postApiTransaction = async (req, res) => {
    const { user,amount, type, description, category } = req.body;

    const transaction = new Transaction({
        user,
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

// const getApiIdTransaction = (async (req, res) => {
//     const fetchedTransaction = await Transaction.findOne();
//     responder({ res, success: true, message: "Successfully FetchedTransaction ", data: fetchedTransaction })
// })

const getApiUserTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const findUserTransaction = await Transaction.find({ user: id }).populate('user')

        findUserTransaction.forEach((singleTransaction) => {
            singleTransaction.user.password = undefined;
        })
        responder({ 
            res,
            success: true,
            data: findUserTransaction,
            message: "Fetched user data"
        })
    }
    catch (err) {
        return responder({
            res,
            success: false,
            message: err.message
        })
    }
}

const getApiTransactionById = async (req, res) => {
    const { id } = req.params;

    const transaction = await Transaction.findOne({ id: id }).populate('transaction');
    return responder({
        res,
        success: true,
        data: transaction,
        message: "Transaction fetched successfully"
    });
}
export { postApiTransaction, getApiTransaction, getApiUserTransaction, getApiTransactionById };