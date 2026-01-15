import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL,
      console.log("Database connected successfully 👌")
    );
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
