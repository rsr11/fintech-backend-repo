// const express = require("express");
import express, { urlencoded } from "express";
import  DbConnection  from "./db/index.js";
import Dotenv  from "dotenv";
import cookieParser from "cookie-parser";  // Used to perform CRUD opration on User Brower's cookie
import cors from "cors";

import AuthRoute from "./routes/auth.route.js"
import TransactionRoute from "./routes/transaction.route.js";
import AnalyticsRoute from "./routes/analytics.route.js";

Dotenv.config();


const app = express();
app.use(express.json({limit:"16kb"}));
app.use(urlencoded({extended:true,limit:'16kb'}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use("/finPocket/api/auth/",AuthRoute);
app.use("/finPocket/api/transaction",TransactionRoute);
app.use("/finPocket/api/analytics",AnalyticsRoute);
// app.use("/finPocket/api/transaction")


app.get("/",(req,res)=>{
    res.json({"server":"working"});
});





const PORT= 4040;

DbConnection().then(app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server Working on port ${process.env.PORT}`); 
})).catch((error)=>{
   console.error( "error while listenig "+ error);
});

