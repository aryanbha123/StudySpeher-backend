// controllers/quizController.js

import Quiz from "../models/Quiz.js";

export const getQuizzes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filters = {};

    if (req.query.difficulty) filters.difficulty = req.query.difficulty;
    if (req.query.type) filters.type = req.query.type;

    // TAG FIX — use ANY match
    if (req.query.tags) {
      const tagsArray = req.query.tags.split(",");
      filters.tags = { $in: tagsArray };
    }

    if (req.query.search) {
      const regex = new RegExp(req.query.search, "i");
      filters.$or = [{ title: regex }, { description: regex }];
    }

    const sortField = req.query.sortBy || "createdAt";
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const quizzes = await Quiz.find(filters)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Quiz.countDocuments(filters);

    return res.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: quizzes,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
