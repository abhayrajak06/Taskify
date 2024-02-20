import userModel from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.uId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      name: updatedUser.name,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImageController = async (req, res) => {
  try {
    const result = await uploadOnCloudinary(req.files.image.path);
    const imageUrl = result.secure_url;

    const token = req.headers.authorization;
    const userId = token._id;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { photo: imageUrl },
      { new: true }
    );

    res.json({ url: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
