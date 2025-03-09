import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    mongoose.connection.on("open", () => {
      console.log("MongoDB connection established.");
    });
    mongoose.connection.on("error", () => {
      console.log(`MongoDB connection error: ${err}`);
    });
    mongoose.connection.on("disconnect", () => {
      console.log("MongoDB connection lost.");
    });
  } catch (e) {
    console.log(`Error connecting to MongoDB: ${e}`);
    process.exit(1);
  }
};
