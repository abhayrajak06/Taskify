import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.uId);
    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserController = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.uId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
