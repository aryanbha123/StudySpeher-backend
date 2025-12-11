import mongoose from "mongoose";

const NoteMessageSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const StudyNoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    notes: [NoteMessageSchema], // only assistant messages
    totalMessages: { type: Number, required: true },

    // OPTIONAL: attach notes to a user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true } // adds createdAt + updatedAt
);

export default mongoose.model("Notes", StudyNoteSchema);
