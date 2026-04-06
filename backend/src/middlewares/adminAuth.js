import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config/envConfig.js";

export default async function adminAuth(req, res, next) {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded != ADMIN_EMAIL + ADMIN_PASSWORD) {
      return res.status(200).json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: `i${err.message}` });
  }
}
