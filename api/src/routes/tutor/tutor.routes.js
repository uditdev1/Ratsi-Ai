import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";
import { dsa_tutor, key } from "../../constants/constants.js";
import dotenv from "dotenv";

dotenv.config();

const tutorRoutes = Router();
const conversationHistory = {};

if (!key) {
    console.error("API_GEMINI_AI environment variable is not set.");
}

let genAI ;
try {
    genAI = new GoogleGenerativeAI(key);
} catch (err){
    console.log("error", err.message);
}

tutorRoutes.get("/removeme", (req, res) => {
    const { userId } = req.query;
    delete conversationHistory[userId];
    res.status(200).json({
        success: true,
    });
});

tutorRoutes.post("/dsa_tutor", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const { prompt, userId } = req.body;
    console.log(prompt , userId);
    if (!prompt || !userId) {
        return res.status(400).json({ error: "Prompt and userId are required" });
    }

    if (!conversationHistory[userId]) {
        conversationHistory[userId] = [{ role : "user" , content : dsa_tutor + " "}];
    }

    conversationHistory[userId].push({ role: "user", content:  prompt });

    const context = conversationHistory[userId]
        .map((msg) => `${msg.role === "user" ? "User" : "Tutor"}: ${msg.content}`)
        .join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContentStream(context + "\nTutor: ");

        let fullResponse = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
            fullResponse += chunkText;
        }

        conversationHistory[userId].push({ role: "tutor", content: fullResponse });
        res.end();
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

export default tutorRoutes;