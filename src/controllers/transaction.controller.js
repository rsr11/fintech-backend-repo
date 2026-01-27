import mongoose from 'mongoose';
import { transactionTypes } from '../constant/category.constant.js';
import Transaction from '../models/transaction.model.js';
import transactionModel from '../models/transaction.model.js';
import UserModel from '../models/User.model.js';



export const transferMoney = async (req,res)=>{
    try {
        // Logic for transferring money between accounts
        const userId = req.user;

        // Get data from request body
        const { amountPaid, category } = req.body;

        // Validate required fields
        if (!amountPaid || !category) {
            return res.status(400).json({ msg: "Amount paid and category are required" });
        }

        // Create new transaction
        const transaction = new Transaction({
            user: userId._id, // Assuming req.user contains the user ID
            amountPaid,
            date:new Date(), // Use provided date or current date
            category
        });

        // Save the transaction
        await transaction.save();

        res.status(201).json({ msg: "Transaction created successfully", transaction });
    
    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Server Error"});
    }
};


export const BalanceDetail = async(req,res)=>{
     
    const userId = req.user;
    try {
        
        const TotalAmountThisMonth = await UserModel.findById(userId._id);

        const CurrentBalance = await transactionModel.aggregate([
            {$match:{
                user:new mongoose.Types.ObjectId(userId._id)
            }},
            {
                $group:{
                    _id:"user",
                    totalAmount:{$sum:"$amountPaid"}
                }
            }
        ]);

        res.status(200).json({totalAmountRemaining:TotalAmountThisMonth?.MonthlyIncome-CurrentBalance[0]?.totalAmount,totalSpend:CurrentBalance[0]?.totalAmount,SavedThisMonth:TotalAmountThisMonth?.MonthlyIncome-CurrentBalance[0]?.totalAmount});

    } catch (error) {
        res.status(404).json(error);
    }


}



export const categoryListing = async (req,res)=>{
    try {
        // Logic for transferring money between accounts
        res.status(200).json({msg:"category list fetched successfully",data:transactionTypes});

    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Server Error"});
    }
}




