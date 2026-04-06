import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_NAME } from "./envConfig.js";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "./envConfig.js";

export default async function connectCloudinary() {
  try {
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary is connected successfully.");
  } catch (err) {
    console.log(err);
  }
}
