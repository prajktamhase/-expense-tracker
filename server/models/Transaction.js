import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        enum: ['Credit', 'Debit'],
        required: true
    },
    category: {
        type:String,
        enum: ['food','entertainement','shopping',"rent",'travel','education','salary','freelancing','side-hussle','other'],
        default:'other',
    },

    description: {
        type: String,
    },
}, {
    timestamps: true
})

const Transaction = model('Transaction', transactionSchema);
export default Transaction;