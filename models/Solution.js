import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    quizSnapshot: [
        {
            questionId: mongoose.Schema.Types.ObjectId,
            question: String,
            options: [
                {
                    option: String,
                }
            ],
            marks: Number
        }
    ]
    ,
    score: { type: Number, required: true },
    responses: [{
        questionId: { type: String },
        answer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    isSubmitted: { type: Boolean, required: true, default: false }
})

export default mongoose.model("Solution", SolutionSchema);