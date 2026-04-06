import mongoose from "mongoose";
import { MONGODB_URI } from "./envConfig.js";

export default async function connectDb() {
  try {
    await mongoose.connect(`${MONGODB_URI}/ecom-app`);
    console.log("Database is connected successfully.");
  } catch (err) {
    console.log(err);
  }
}
