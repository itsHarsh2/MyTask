import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
     googleId: {
        type: String,
        sparse: true // Allows multiple documents without this field
    },
    avatar: {
        type: String,
        default: null
    },
    authProvider: {
        type: String,
        enum: ['email', 'google'],
        default: 'email'
    }
}, {timestamps:true} )

    const User = mongoose.model('User', userSchema);
    export default User;