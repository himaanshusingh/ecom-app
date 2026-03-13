import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected");
  } catch (error) {
    console.log("error", error);
  }
}
