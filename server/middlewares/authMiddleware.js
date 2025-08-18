import jwt from "jsonwebtoken"

export const protect = (req,res,next) =>{
    const authHeader  = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.json({message:"no token provided"})
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded // Attach user info to req object
        next();// Continue to the next middleware or controller
    } catch (error) {
        return res.json({message:"invalid token"})
    }
}