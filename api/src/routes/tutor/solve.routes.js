import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";
import { img_bug_prompt, key } from "../../constants/constants.js";
import dotenv from "dotenv";
import multer from "multer";
import { storage } from "../../config/cloudinary.config.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import audioRoutes from "./audio.routes.js";

const upload = multer( { storage } );
dotenv.config();

const solveRoutes = Router();
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

solveRoutes.use("/audio" , audioRoutes);

solveRoutes.post("/img/bug" , upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded!");
    }
    const image = req.file.path;
    const { userId , description } = req.body;

    const prompt = description + " " + img_bug_prompt;
    
    let respo = (await img_bug_solver(image , prompt)).response.text();

    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    conversationHistory[userId].push({ role: "user", content: prompt });
    conversationHistory[userId].push({ role: "tutor", content: respo });

    res.status(200).json({
      success : true , 
      image : image,
      message : respo, 
    });

  } catch (e) {
    console.log(e);
    res.status(401).json({
      success : false,
      message : e.message
    })
  }
})

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

const img_bug_solver = async (image , description) => {
  const imageResp = await fetch(image)
      .then((response) => response.arrayBuffer());

  const result = await model.generateContent([
      {
          inlineData: {
              data: Buffer.from(imageResp).toString("base64"),
              mimeType : "image/png",
          },
      },
      description
  ]);
  return result;
}

solveRoutes.post("/img/query", async (req, res) => {
  try {
    const { prompt, userId } = req.body;

    conversationHistory[userId].push({ role: "user", content: prompt });

    const context = conversationHistory[userId]
        .map((msg) => `${msg.role === "user" ? "User" : "Tutor"}: ${msg.content}`)
        .join("\n");

    const result = (await model.generateContent(context + " User : " + prompt + " \n Tutor : ")).response.text();

    res.status(200).json({
      success : true ,
      message : result
    })
  } catch (e) {
    res.status(400).json({
      success : false,
      message : e.message
    })
  }
})

solveRoutes.get("/removeme", (req, res) => {
  const { userId } = req.query;
  delete conversationHistory[userId];
  res.status(200).json({
      success: true,
  });
});

solveRoutes.get("/hello", (req, res) => {
  res.json({
    conversationHistory
  })
})

export default solveRoutes;