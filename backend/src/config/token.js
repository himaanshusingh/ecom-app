import jwt from "jsonwebtoken";

export async function genToken(userId) {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("error", error);
  }
}

export async function genToken1(email) {
  try {
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("error", error);
  }
}
