import express from "express"
import Task from "../models/Task.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

// POST /api/tasks - Create task
router.post('/',protect,async(req,res)=>{
    const {title,datetime, recurrence, customRecurrence } = req.body;

    const task = new Task({
        userId:req.user.id,
        title,
        datetime,
        recurrence,
        customRecurrence
    });

    const saveTask = await task.save();
     res.json(saveTask)
});

// GET /api/tasks - Get all tasks for user
router.get('/',protect,async(req,res)=>{
    const task =await Task.find({userId:req.user.id}).sort({datetime:1})
    res.json(task)
})

// PUT /api/tasks/:id - Update a task
router.put('/:id',protect,async(req,res)=>{
 const task = await Task.findOneAndUpdate(
  {_id:req.params.id, userId:req.user.id}, // **req.params** is an object that contains route parameters
   req.body,
   {new:true}
 ) 

 if (!task) return res.json({ message: 'Task not found' });
  res.json(task);

}) 

// DELETE /api/tasks/:id - Delete a task

router.delete('/:id', protect, async (req, res) => {
  try {
    const result = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting task', error: error.message });
  }
});

export default router;