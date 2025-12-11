import { configDotenv } from "dotenv";
configDotenv();
export const askGemini = async (promt) => {
    const data = {
        messages: [
            {
                role: "user",
                content: promt
            },
        ],
        model: "deepseek-ai/DeepSeek-V3.2:novita",
    }
    const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

