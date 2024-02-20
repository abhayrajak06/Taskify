import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getSingleTodoController,
  readTodoController,
  updateTodoController,
} from "../controllers/todoControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

//router object
const router = express.Router();

//add todo || POST
router.post("/create", verifyToken, createTodoController);

//read todo || GET
router.get("/all-todos/:uId", verifyToken, readTodoController);

//update todo || PUT
router.put("/update/:tId", verifyToken, updateTodoController);

//delete todo || DELETE
router.delete("/delete/:tId", verifyToken, deleteTodoController);

//get todo || GET
router.get("/get-todo/:tId", verifyToken, getSingleTodoController);

export default router;
