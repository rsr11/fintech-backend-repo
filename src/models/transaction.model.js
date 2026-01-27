import mongoose from "mongoose";
import { transactionTypes } from "../constant/category.constant.js";

const Transaction = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }, 
    amountPaid:Number,
    date:Date,
    category:{
        type:String,
        enum: transactionTypes ,
        required:true
    },
},{timestamps:true})



export default mongoose.model("transaction",Transaction);


