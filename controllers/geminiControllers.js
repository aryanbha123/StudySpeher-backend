import { askGemini } from "../service/geminiService.js";


export const geminiStudy = async (req, res) => {
    try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const aiResponse = await askGemini(prompt);

    res.json({
      success: true,
      response: aiResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}


