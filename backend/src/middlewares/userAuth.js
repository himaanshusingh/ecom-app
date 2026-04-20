import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";

export default async function userAuth(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.headers.userId = decoded.id;
    console.log(req.headers.userId);
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
