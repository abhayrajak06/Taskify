import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//config env
dotenv.config();

//config database
connectDB();

const app = express();
app.use(
  cors({
    origin: "https://taskify-abhay.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.json("Hello from API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
