import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import { jemimahProfile } from "./lunaPrompt.js";
import { generateWithFallback } from "./aiProviders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const REQUEST_DEADLINE_MS = 17000;


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://jemimah-portfolio.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

function getEnvironmentSecret(name) {
  const value = process.env[name]?.trim();
  if (!value) return undefined;

  const hasQuotes =
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"));

  return (hasQuotes ? value.slice(1, -1) : value).trim() || undefined;
}

const geminiApiKey = getEnvironmentSecret("GEMINI_API_KEY");
const groqApiKey = getEnvironmentSecret("GROQ_API_KEY");
const ai = geminiApiKey
  ? new GoogleGenAI({ apiKey: geminiApiKey })
  : null;
const groq = groqApiKey
  ? new Groq({ apiKey: groqApiKey, maxRetries: 0 })
  : null;
const groqModel =
  process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";

const modelsToTry = [
  process.env.GEMINI_MODEL || "gemini-3.6-flash",
  "gemini-3.8-flash",
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

    const result = await generateWithFallback({
      geminiModels: modelsToTry,
      groqModel,
      hasGemini: Boolean(ai),
      hasGroq: Boolean(groq),
      deadlineMs: REQUEST_DEADLINE_MS,
      generateGemini: async ({ model, signal, timeoutMs }) => {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: jemimahProfile,
            temperature: 0.4,
            abortSignal: signal,
            httpOptions: {
              timeout: timeoutMs,
              retryOptions: { attempts: 1 },
            },
          },
        });

        return response.text;
      },
      generateGroq: async ({ model, signal, timeoutMs }) => {
        const messages = [
          { role: "system", content: jemimahProfile },
          ...contents.map((item) => ({
            role: item.role === "model" ? "assistant" : "user",
            content: item.parts.map((part) => part.text).join("\n"),
          })),
        ];
        const response = await groq.chat.completions.create(
          {
            model,
            messages,
            temperature: 0.4,
          },
          { signal, timeout: timeoutMs, maxRetries: 0 }
        );

        return response.choices[0]?.message?.content;
      },
    });

    return res.json({
      reply: result.reply,
      model: result.model,
    });
  } catch (error) {
    const timedOut = error?.code === "LUNA_TIMEOUT";
    console.error(
      `LUNA request failed: ${timedOut ? "provider deadline exceeded" : "no provider returned a reply"}`
    );

    return res.status(timedOut ? 504 : 503).json({
      error: timedOut
        ? "LUNA is taking longer than expected. Please try again shortly."
        : "LUNA is temporarily unavailable. Please try again in a moment.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌙 LUNA backend: http://localhost:${PORT}`);
  console.log(
    `AI providers enabled: ${[ai && "Gemini", groq && "Groq"].filter(Boolean).join(", ") || "none"}`
  );
  modelsToTry.forEach((model) => {
    if (ai) console.log(`   - Gemini: ${model}`);
  });
  if (groq) console.log(`   - Groq: ${groqModel}`);
});