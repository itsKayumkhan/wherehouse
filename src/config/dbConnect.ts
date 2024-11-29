import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGO_URL );

    console.log("Database connected");
    isConnected = true;
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default dbConnect;
