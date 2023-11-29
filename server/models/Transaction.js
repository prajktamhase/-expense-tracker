import { Schema,model } from "mongoose";

const transactionSchema = new Schema({
    amount:{
        type:Number,
        required:true,
    },

    type:{
        type:String,
        enum:['credit','debit'],
        required:true
    },
    category:{
        type:String,
        enum:['Food','Entertainment','Rent','Shooping','Travel','Education','Salary','Freelancing','Side-hussle','Other'],
        default:'other'
    },
    description:{
        type:String,
    },    
},{
    timestamps:true
})

const Transaction =model('Transaction',transactionSchema);
export default Transaction;