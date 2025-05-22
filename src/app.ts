import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { API_PREFIX } from "./config/environment";
import AuthRouter from "./routes/auth";
import TodoRouter from "./routes/todo";
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
dotenv.config();
const uploadsDir = path.resolve(__dirname, "public/uploads");
fs.existsSync(uploadsDir) || fs.mkdirSync(uploadsDir, { recursive: true });

const app = express();

connectDB();

app.get("/", (req: Request, res: Response) => {
    return res.send({ message: "Welcome to NodeJS Template" });
})
app.use("/public/uploads", express.static(path.resolve(__dirname, "../public/uploads")));
app.use(cors({ origin: "*" }));
app.use(express.json())
// Routes

app.use(`${API_PREFIX}/auth`, AuthRouter);
app.use(`${API_PREFIX}/todo`, TodoRouter);

export default app;
