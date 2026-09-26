import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { jemimahProfile } from "./lunaPrompt.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);

app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing from .env");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const modelsToTry = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
];

const PRIVATE_MESSAGE =
  "Sorry, I can’t help with personal questions about Jemimah. I can help you learn about her projects, skills, education, interests, and portfolio instead.";

const privateQuestionPatterns = [
  /\bhome address\b/i,
  /\baddress\b/i,
  /\bphone number\b/i,
  /\bmobile number\b/i,
  /\bpersonal email\b/i,
  /\bprivate email\b/i,
  /\bpassword\b/i,
  /\bboyfriend\b/i,
  /\bgirlfriend\b/i,
  /\bdating\b/i,
  /\brelationship status\b/i,
  /\bpersonal life\b/i,
  /\bfamily details\b/i,
  /\bsalary\b/i,
  /\bincome\b/i,
  /\bprivate messages\b/i,
  /\bprivate account\b/i,
];

function isPrivateQuestion(message) {
  return privateQuestionPatterns.some((pattern) =>
    pattern.test(message)
  );
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.get("/", (req, res) => {
  res.json({
    message: "LUNA AI backend is running.",
  });
});

app.post("/api/luna", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please provide a valid message.",
      });
    }

    const cleanMessage = message.trim();

    if (!cleanMessage) {
      return res.status(400).json({
        error: "Message cannot be empty.",
      });
    }

    // Handle private questions before sending anything to Gemini.
    if (isPrivateQuestion(cleanMessage)) {
      return res.json({
        reply: PRIVATE_MESSAGE,
      });
    }

    const recentHistory = Array.isArray(history)
      ? history.slice(-10)
      : [];

    const contents = [];

    for (const item of recentHistory) {
      if (
        item &&
        (item.role === "user" || item.role === "model") &&
        typeof item.content === "string"
      ) {
        contents.push({
          role: item.role,
          parts: [
            {
              text: item.content,
            },
          ],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [
        {
          text: cleanMessage,
        },
      ],
    });

    let lastError = null;

    for (let i = 0; i < modelsToTry.length; i++) {
      const model = modelsToTry[i];

      console.log(
        `🤖 Trying Gemini model ${i + 1}/${modelsToTry.length}: ${model}`
      );

      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: jemimahProfile,
            temperature: 0.4,
          },
        });

        const reply =
          response.text ||
          "Sorry, I couldn't generate a response right now.";

        console.log(`✅ LUNA response generated using ${model}`);

        return res.json({
          reply,
          model,
        });
      } catch (error) {
        lastError = error;

        console.error(
          `❌ ${model} failed:`,
          error?.message || error
        );

        // Wait briefly before trying the next model.
        if (i < modelsToTry.length - 1) {
          await wait(800);
        }
      }
    }

    console.error("❌ All Gemini models failed.");
    console.error(lastError);

    return res.status(503).json({
      error:
        "LUNA is temporarily busy. Please try again in a moment.",
    });
  } catch (error) {
    console.error("❌ LUNA ERROR:");
    console.error(error);

    return res.status(500).json({
      error:
        "LUNA is temporarily unavailable. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌙 LUNA backend: http://localhost:${PORT}`);
  console.log("🤖 Gemini fallback models enabled:");
  modelsToTry.forEach((model) => {
    console.log(`   - ${model}`);
  });
});