import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        }
    ,
    MonthlyIncome:Number,
    Profession:String,

},{timestamps:true})




User.pre("save", async function(next){
    // if(!this.isModified(this.password)) return next();

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

User.methods.comparePassword = async function(password){
     return await bcrypt.compare(password, this.password);
};

User.methods.generateJWT = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET,{expiresIn:'24h'} );
    return token;
}

export default mongoose.model('User',User);