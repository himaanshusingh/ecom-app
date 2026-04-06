// External Modules :-
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Local Modules :-
import userModel from "../models/userModel.js";
import { JWT_SECRET } from "../config/envConfig.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config/envConfig.js";

// Route for user Registration :-
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Checking if user already exists :-
    const isExists = await userModel.findOne({ email });
    if (isExists) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    // Validating email format & strong password :-
    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(401)
        .json({ success: false, message: "Password should be min 8 chars" });
    }

    // Hashing user password :-
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({ name, email, password: hPassword });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(201).json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exists" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      res.status(404).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, message: err.message });
  }
}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}
