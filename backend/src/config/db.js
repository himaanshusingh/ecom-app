import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected");
  } catch (error) {
    console.log("error", error);
  }
}
