import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { ELEVENLABS_API_KEY, key } from '../../constants/constants.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const audioRoutes = express();

if (!key) {
    console.error("API_GEMINI_AI environment variable is not set.");
}

let genAI ;
try {
    genAI = new GoogleGenerativeAI(key);
} catch (err){
    console.log("error", err.message);
}

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

audioRoutes.post('/', async (req, res) => {
    const { text } = req.body;
    try {
        const result = (await model.generateContent(text)).response.text();

        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL`,
            {
                text: result,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.8
                }
            },
            {
                headers: {
                    "xi-api-key": ELEVENLABS_API_KEY ,
                    "Content-Type": "application/json"
                },
                responseType: 'arraybuffer',
            }
        );

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'inline; filename="speech.mp3"');
        res.status(200).send(response.data);

    } catch (error) {
        console.error("TTS Error:", error.response?.data || error.message);
        res.status(500).json({ success : false ,  message : "Text-to-Speech failed" });
    }
});

export default audioRoutes;