import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config("../.env");

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await userModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const matchPassword = await comparePassword(
      req.body.password,
      user?.password
    );
    if (!matchPassword)
      return res.status(401).json({ message: "Wrong email or password" });
    const token = JWT.sign(
      {
        _id: user?._id,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );
    res
      .status(200)
      .json({ token, _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
  }
};
