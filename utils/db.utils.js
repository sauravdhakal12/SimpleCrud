import mongoose from "mongoose";
import config from "./config.utils.js";

export default async function connectDB() {
  try {

    // Connnect to db using URL from .env
    const conn = await mongoose.connect(config.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
