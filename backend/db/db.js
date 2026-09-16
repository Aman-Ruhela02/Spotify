import mongoose from "mongoose";

async function dbConnection() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export default dbConnection;
