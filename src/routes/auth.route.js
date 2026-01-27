import express from "express";
import { OtpGenrator, OtpSender } from "../utils/otp.utils.js";
import UserModel from "../models/User.model.js";
import jsonwebtoken from "jsonwebtoken";
import { CompareHashPass, PasswordHashing } from "../utils/passHash.utils.js";
import { GetUserData, ProfileData, UserLogin, UserLogOut, UserRegistration } from "../controllers/User.controller.js";
import { userAuthentication } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import { LoginValidator, RegistrationValidator } from "../validator/User.validator.js";
import { dataValidator } from "../middlewares/validation.middleware.js";


const route = express.Router();



route.post('/registration', RegistrationValidator, dataValidator , UserRegistration);

route.post("/login",LoginValidator,dataValidator,UserLogin);



route.get('/profile', userAuthentication , ProfileData);

route.get('/logout',userAuthentication,UserLogOut);

route.get(`/get-user`,userAuthentication,GetUserData);
  
// api for user Registration  
// route.post("/registerUser", async (req,res)=>{
     
//   const user = req.body;
//   const UserPassword = user.password;

//   let hashPassworded = await PasswordHashing(UserPassword);

//    console.log(
//    user.name + "This is for twesting purpose", hashPassworded
//   );

//   if(hashPassworded){

//   const data =   await UserModel.insertOne({
//       name:user.name,
//       email:user.email,
//       password:hashPassworded
//      });

//      console.log(data);
      
//      if(data){
//         res.json({name:user.name, email:user.email, isUserDetailFilled: false, isLoggedIn:true});
//      }else{
//       res.status(404).send({mss:"erroer occursed"});
//      }


//   }else{
//    res.status(404).json({mssg:"error occured"});
//   }
  
//   });







  // for login purpose
//   route.post("/LoginUser", async(req,res)=>{
//        const email = req.body.email;
//        const inputPassword = req.body.password;

//        console.log(email+ " " + inputPassword);
       
//       try {
//          const isUserExist = await UserModel.find({'email':email});

//       console.log(isUserExist);
      

//          if(isUserExist.length > 0){
         
//          const hashedPassword = isUserExist[0]?.password;

//          const isPasswordCorrect = await CompareHashPass(hashedPassword,inputPassword);
//          console.log(isPasswordCorrect);
         
//          res.status(200).json({email,inputPassword,isUserExist});
//          }else{
//          res.status(404).json({"mssg":"User not found"});
         
//       }
//       } catch (error) {
//          console.log(error);
         
//       }
      
         
      
      
       


//   })


 
  

//   console.log(user.name, user.email , user.password);
  

//   const hashedPassword = jsonwebtoken.sign()
  // password hashing
   
//   const {name,email,passord} = req.body;
//   console.log(passord);



route.get("/getUserInfo/:email",(req,res)=>{
     
   let email = req.params.email;

   let Userdata = UserModel.findOne({email});

   res.status(200).send(Userdata);
   

})


route.get("/sendOtp/:gmail", async (req,res)=>{
     
//    console.log("first api : "+ req.params.gmail); 
    // OtpGenrator();

   const otp = OtpGenrator();
   const gmail = req.params.gmail;
//    console.log(typeof(gmail));
   let isSended = await  OtpSender(gmail,otp);
   console.log(isSended);
   
   if(isSended){
      console.log(otp+" thiss is a otp that has been sended!!");
      res.status(200).send(otp);
   }else{
      res.status(404).send({error:"there is error in sending otp, plz try later."})
      console.log(404);
      
   }

});




route.post("/registration/newUser",async(req,res)=>{
   
   // const {name,  }
   res.send("User registration completed!");

});


export default route;









// testing purpose for authentication

{
   email:"test123@gmail.com"
   password: "Testing2#123"
   
   email: "testing@gmail.com"
   password: "Testing#45411"


}