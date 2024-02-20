import todoModel from "../models/todoModel.js";

export const createTodoController = async (req, res) => {
  try {
    const newTodo = new todoModel(req.body);
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (error) {
    console.log(error);
  }
};

export const readTodoController = async (req, res) => {
  try {
    const todos = await todoModel.find({ user: req.params.uId });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoController = async (req, res) => {
  try {
    const updatedTodos = await todoModel.findByIdAndUpdate(
      req.params.tId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTodos);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    await todoModel.findByIdAndDelete(req.params.tId);
    res.status(200).json("Todo deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTodoController = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.tId);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
  }
};
