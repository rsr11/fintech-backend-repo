import bcrypt, { genSalt } from "bcrypt";


export const PasswordHashing = async (password)=>{
    
   const salt = await genSalt(11);
   const hashpassword = await bcrypt.hash(password,salt);

   return hashpassword;
};




export const CompareHashPass = async (HashPass, userPassword)=>{
     const isPasswordSame = await bcrypt.compare(userPassword,HashPass);
     return isPasswordSame;
};