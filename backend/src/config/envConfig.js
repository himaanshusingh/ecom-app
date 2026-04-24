import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const STRIPE_SECRET = process.env.STRIPE_SECRET;
export const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
export const RAZORPAY_KEY = process.env.RAZORPAY_KEY;

const msg = "is not defined in the .env file";
if (!PORT) throw new Error(`PORT ${msg}`);
if (!MONGODB_URI) throw new Error(`MONGODB_URI ${msg}`);
if (!CLOUDINARY_NAME) throw new Error(`CLOUDINARY_NAME ${msg}`);
if (!CLOUDINARY_API_KEY) throw new Error(`CLODUINARY_API_KEY ${msg}`);
if (!CLOUDINARY_API_SECRET) throw new Error(`CLOUDINARY_API_SECRET ${msg}`);
if (!JWT_SECRET) throw new Error(`JWT_SECRET ${msg}`);
if (!STRIPE_SECRET) throw new Error(`STRIPE_SECRET ${msg}`);
if (!RAZORPAY_SECRET) throw new Error(`RAZORPAY_SECRET ${msg}`);
if (!RAZORPAY_KEY) throw new Error(`RAZORPAY_KEY ${msg}`);
