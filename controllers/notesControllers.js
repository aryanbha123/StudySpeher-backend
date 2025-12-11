import Notes from "../models/Notes.js";

/**
 * GET all notes of a specific user
 */
export const getNotesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const notes = await Notes.find({ userId }).sort({ createdAt: -1 });

    return res.json({ total: notes.length, data: notes });
  } catch (err) {
    console.error("Error fetching notes:", err);
    return res.status(500).json({ message: "Failed to fetch notes" });
  }
};

/**
 * CREATE a new note
 */
export const addNote = async (req, res) => {
  try {
    const { userId, title, notes, totalMessages } = req.body;

    if (!userId || !title || !notes) {
      return res.status(400).json({ message: "userId, title & notes are required." });
    }

    const saved = await Notes.create({
      userId,
      title,
      notes,
      totalMessages,
    });

    return res.json({ message: "Note created", data: saved });
  } catch (err) {
    console.error("Error adding note:", err);
    return res.status(500).json({ message: "Failed to add note" });
  }
};

/**
 * DELETE a note by ID
 */
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notes.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ message: "Note deleted", deleted });
  } catch (err) {
    console.error("Error deleting note:", err);
    return res.status(500).json({ message: "Failed to delete note" });
  }
};
