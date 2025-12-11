
import Solution from '../models/Solution.js';
import Quiz from '../models/Quiz.js';

export const getUserSoltion = async (req, res) => {
  try {
    const quizId = req.params.id;
    const userId = req.user._id;

    // Fetch quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    // Check for existing solution
    let userSolution = await Solution.findOne({ userId, quizId });

    // CASE 1 → First time → Create solution with quizSnapshot
    if (!userSolution) {
      // Randomize
      const randomizedQuestions = quiz.questions
        .sort(() => Math.random() - 0.5)
        .slice(0, quiz.maxQuestions);

      const quizSnapshot = randomizedQuestions.map(q => ({
        questionId: q._id,
        question: q.question,
        options: q.options.map(o => ({
          option: o.option, // No isCorrect (important)
        })),
        marks: q.marks,
      }));

      userSolution = new Solution({
        userId,
        quizId,
        score: 0,
        isSubmitted: false,
        quizSnapshot,           // 🔥 The snapshot stored here
        responses: quizSnapshot.map(q => ({
          questionId: q.questionId,
          answer: null,
        })),
      });

      await userSolution.save();

      return res.status(200).json({
        success: true,
        data: userSolution,
      });
    }

    // CASE 2 → Already submitted
    if (userSolution.isSubmitted) {
      return res.status(400).json({
        success: false,
        message: "User solution already submitted",
      });
    }

    // CASE 3 → Resume existing attempt
    return res.status(200).json({ success: true, data: userSolution });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
