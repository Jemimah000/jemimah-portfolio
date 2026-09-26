
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({
  path: new URL("../.env", import.meta.url),
});

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing from .env");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

try {
  console.log(`Testing model: ${model}`);

  const response = await ai.models.generateContent({
    model,
    contents: "Say hello! Introduce yourself as LUNA.",
  });

  console.log("LUNA RESPONSE:", response.text);
} catch (error) {
  console.error("FAILED:", {
    status: error.status,
    message: error.message,
  });
}
