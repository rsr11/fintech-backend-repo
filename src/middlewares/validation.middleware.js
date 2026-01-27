import { validationResult } from "express-validator";

export const dataValidator = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg:errors.array()});
    };
    next();

};