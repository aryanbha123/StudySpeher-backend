import mongoose from "mongoose";


const tags = [
    "aptitude", "general knowledge", "technical", "mathematics", "english", "reasoning"
    ,"logical reasoning",   
    "verbal reasoning" ,
    "non verbal reasoning",
    "puzzles",
    "critical thinking",
    "pattern recognition",
    "data interpretation",
    "series",
    "directions",
    "analogies",
    "blood relations",
    "coding reasoning",
    "quantitative aptitude",
    "arithmetic",
    "mental ability"
]
const difficulty = ["easy", "medium", "hard"]
const types = ["mcq", "msq", "text"]

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: types, required: true },
    timeLimit: { type: Number, required: true },
    tags: [{
        type: String,
        enum: tags,
        required: true
    }],
    difficulty: { type: String, enum: difficulty, required: true },
    maxQuestions: { type: Number, required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{
            option: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }],
        marks: { type: Number, required: true },
    }],
    answer: {
        type: String,
        required: function () {
            return this.type === "text";
        },
    },

});

export default mongoose.model("Quiz", QuizSchema);
