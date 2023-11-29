import { Schema,model } from "mongoose";

//schema
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
    type:String,
    required:true,
   unique:true,
},
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    }
},
{
    timestapms:true,
}
);

//Model
const User = model("User",userSchema);
 export default User