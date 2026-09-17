import mongoose from "mongoose";

async function dbConnection() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.error("Database connection failed:",error);
    
  }
}

export default dbConnection;
