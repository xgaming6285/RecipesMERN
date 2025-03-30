import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.js'
import recipeRouter from './routes/recipe.js'
import cors from 'cors'

// Environment variables 
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/RecipesMERN1";

const app = express(); 

app.use(express.json())
app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
 
}))

// userRouter
app.use('/api',userRouter)

// recipeRouter
app.use('/api',recipeRouter)

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB is connected to database"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
