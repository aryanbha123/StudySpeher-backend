import express from "express";
import {
  getNotesByUser,
  addNote,
  deleteNote,
} from "../controllers/notesControllers.js";

const notesRouter = express.Router();

// GET notes of a user
notesRouter.get("/:userId", getNotesByUser);

// ADD new note
notesRouter.post("/", addNote);

// DELETE note by ID
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
