import UserModel from "../models/User.model.js";
import User from "../models/User.model.js";
import cookieParser from "cookie-parser";



export const UserRegistration = async (req,res)=>{

    try {

        const {name,email,password,MonthlyIncome,Profession} = req.body;
        const UserExist = await User.findOne({email:email});
        if(UserExist) return res.status(409).json({msg:"User already exist!"});      
        const user = await User.create({name,email,password,MonthlyIncome,Profession });

        const token = await user.generateJWT();
        
        res.status(200).cookie("token", token, {
            httpOnly: true, secure:true, sameSite:'strict', maxAge: 24 * 60 * 60 * 1000}).json({name:user.name, email:user.email, MonthlyIncome:user.MonthlyIncome,Profession:user.Profession,token});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"});        
    }
};


export const ProfileData = async (req,res)=>{
    try {
       
        const userId = req.user;
        
        const user = await User.findById(userId._id).select("-password -__v -createdAt -updatedAt");
        res.status(200).json({user});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"}); 
    }
};



export const GetUserData = async (req,res)=>{
  
    try {
        const userId = req.user;
        const UserData = await UserModel.findById(userId);
        
        if(!UserData) return res.status(500).json({msg:"no data found"});

        res.json({UserData});
        
        
    } catch (error) {
        return res.status(400).json({msg:"server error!"});
    }


}





export const UserLogin = async (req,res)=>{
    try {   
      const {email,password} = req.body;

    //   console.log(email,password);
      
        const userExist = await User.findOne({email}).select(`+password`);

        if(!userExist) return res.status(401).json({msg:"Invalid credentials! "});

        const isPasswordMatch = await userExist.comparePassword(password);
        if(!isPasswordMatch) return res.status(401).json({msg:"Invalid credentials! "});
        const token = await userExist.generateJWT();

        res.status(200).cookie("token", token, {
            httpOnly: true, secure:false, sameSite:'lax', maxAge: 24 * 60 * 60 * 1000}).json({name:userExist.name, email:userExist.email, token});

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"}); 
    } 
 };


 export const UserLogOut = async(req,res)=>{
     
     try {
         const userId = req.user;
        
         const user = await User.findById(userId._id);
         if(user){
            res.clearCookie("token", {httpOnly: true,secure: true,sameSite: "strict"});
            res.status(200).json({ msg: "Logged out" });
         }else{
            res.status(404).json({msg:"Server error"});
         }

        
     } catch (error) {
         res.status(404).json({msg:"Server error", error});
     }
 };