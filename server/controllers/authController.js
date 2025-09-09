import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
import User from "../models/users.js";

export const signup = async(req,res)=>{
    const {name,email,password} =req.body;
    try {
        //check if already exist
        const existingUser = await User.findOne({email});
        if(existingUser) return res.json({success:false , message:'email already exist'})

        //hashing the password    
        const hashedPassword = await bcrypt.hash(password,10)

        //creating a new user
        const user = await User.create({name,email,password:hashedPassword,
           authProvider: 'email' // Specify this is email signup 
        })
         
        //create jwt without expire
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    return res.json({
      success: true,
      message: 'Signup successful',
      token,
      user,
    });
        
    } catch (error) {
        return res.json({ success: false, message: 'Signup failed', error: error.message });
    }
}


//login logic
export const login = async(req,res)=>{
    const { email, password } = req.body;
     try {
        //check if user present or not
        const user = await User.findOne({email});
        if(!user)return res.json({success:false , message:'user not found'}) 

        // Check if user signed up with Google
        if (user.authProvider === 'google' && !user.password) {
            return res.json({
                success: false, 
                message: 'This account uses Google Sign-In. Please use the Google login button.'
            });
        }    
         
        //compare password
        const isMatch  = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.json({success:false , message:'password is incorrect'})

        //compare password (only if user has a password)
        if (user.password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.json({success:false , message:'password is incorrect'})
        }
         
         // Create JWT    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

         // Return token and user
        return res.json({
        success: true,
        message: 'Login successful',
        token,
        user,
        });

     } catch (error) {
        return res.json({success:false,message:'login fail',error:error.message});
     }
}