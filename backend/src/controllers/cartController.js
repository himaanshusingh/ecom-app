import userModel from "../models/userModel.js";

export async function addToCart(req, res) {
  try {
    const { userId } = req.headers;
    const { itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) cartData[itemId][size] += 1;
      else cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Add To Cart" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function updateCart(req, res) {
  try {
    const { userId } = req.headers;
    const { itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Added to Cart" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function getUserCart(req, res) {
  try {
    const { userId } = req.headers;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
}
