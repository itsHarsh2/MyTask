import mongoose, { Schema, Types } from "mongoose";

const taskSchema = new  mongoose.Schema({
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      title:{
        type:String,
        required:true
      },
      datetime:{
        type:Date,
        required:true   
      },
      recurrence:{
        type:String,
        default:'once'
      },
      customRecurrence: {
         type: String, default: ''
      }
},{timestamps:true})

export default mongoose.model('Task',taskSchema)