import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/authController.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());//parse json request bodies

//connect to db 
 connectDb();

//rotes
app.use('/api/tasks',taskRoutes)
app.use('/api/auth',authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));