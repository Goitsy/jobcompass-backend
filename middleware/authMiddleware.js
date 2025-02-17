import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/UserModel.js";

dotenv.config();

// verify the token and get us the user
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token found, authorization denied" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    //We needed the user ID attached
    const user = await userModel.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Could not find user object" });
    }

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid. Check credentials" });
  }
};

export default protect;
