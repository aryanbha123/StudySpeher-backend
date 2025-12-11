import { Router } from "express";
import { geminiStudy } from "../controllers/geminIControllers.js";

const geminiRouter = Router();

geminiRouter.post("/ask", geminiStudy);


export default geminiRouter