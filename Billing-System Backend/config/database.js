import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;
  const localUri =
    process.env.MONGO_URI_LOCAL || "mongodb://127.0.0.1:27017/billing_system";

  if (!atlasUri && !localUri) {
    throw new Error("Set MONGO_URI or MONGO_URI_LOCAL in .env");
  }

  const connectOptions = {
    family: 4,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  };

  if (atlasUri) {
    try {
      await mongoose.connect(atlasUri, connectOptions);
      console.log("MongoDB connected (Atlas)");
      return;
    } catch (error) {
      const atlasMessage = error?.message || "Unknown Atlas connection error";
      console.warn(`Atlas connection failed: ${atlasMessage}`);
      console.warn("Trying local MongoDB fallback...");
    }
  }

  try {
    await mongoose.connect(localUri, connectOptions);
    console.log(`MongoDB connected (Local): ${localUri}`);
  } catch (error) {
    const message = error?.message || "Unknown MongoDB connection error";
    throw new Error(
      `Could not connect to Atlas or local MongoDB. Last error: ${message}`
    );
  }
};

export default connectDB;
