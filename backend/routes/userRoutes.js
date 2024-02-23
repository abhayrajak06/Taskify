import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/userControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// User details || GET
router.get("/my-details/:uId", verifyToken, getUserController);

// User details update || PUT
router.put("/update-details/:uId", updateUserController);

export default router;
