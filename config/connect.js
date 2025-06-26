import mongoose from "mongoose";

const connectDB = async() => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/school");
    console.log(`🚀 MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
