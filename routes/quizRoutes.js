// routes/quizRoutes.js
import express from "express";
import { getQuizzes } from "../controllers/quizControllers.js";

const quizRouter = express.Router();

quizRouter.get("/getall", getQuizzes);

export default quizRouter;
