import mongoose from "mongoose";
import { DB_URL } from "./config.js";

export default async function connectDB() {
  try {

    // Connnect to db using URL from .env
    const conn = await mongoose.connect(DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
