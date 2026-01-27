import mongoose from "mongoose";

const Notification = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true
    },
    notifyDate:Date,
    whereTo:String,
    note:String
    
},{timestamps:true});


export default mongoose.model("notification",Notification);