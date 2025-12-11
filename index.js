import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import geminiRouter from "./routes/geminiRoutes.js";
import mongoose from "mongoose";
import quizRouter from "./routes/quizRoutes.js";
import notesRouter from "./routes/notesRoutes.js";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connectd to db"))
.catch(() => console.log("Error"));
// Security
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true , methods:['POST', 'GET']}));

// Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Parsers
app.use(express.json());
app.use(cookieParser());

// Logger
app.use(morgan("dev"));


app.use("/api/gemini", geminiRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/notes", notesRouter);

// Route
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
