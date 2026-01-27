import jwt from 'jsonwebtoken';



export const userAuthentication = async (req,res,next)=>{
    try {
        const token = req.cookies?.token;
        // console.log(token);
        
        if(!token) return res.status(401).json({msg:"Unauthorized access, token missing!"});        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded);
        
        next();
        return;

    } catch (error) {
        console.log(error);
        res.status(401).json({msg:"Unauthorized access, invalid token!"}); 
    }
};



