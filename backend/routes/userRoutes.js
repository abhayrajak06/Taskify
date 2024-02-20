import express from "express";
import {
  getUserController,
  updateUserController,
  uploadImageController,
} from "../controllers/userControllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import formidable from "express-formidable";

const router = express.Router();

// User details || GET
router.get("/my-details/:uId", verifyToken, getUserController);

// User details update || PUT
router.put("/update-details/:uId", verifyToken, updateUserController);

router.post(
  "/upload-image",
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImageController
);

export default router;
