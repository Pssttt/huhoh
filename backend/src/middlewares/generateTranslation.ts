import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Context } from "hono";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateZtoENTranslation = async (c: Context) => {
  try {
    const formData = await c.req.formData();
    const input = formData.get("input") as string;

    if (!input) {
      return c.json({ error: "Input is required" }, 400);
    }

    const prompt = `
Rewrite the following slang-heavy sentence into plain English. Extract all slang words and provide their meanings. Also add example sentence for each slang word and their origin.
Respond in strict JSON like:
{
  "original": "${input}",
  "translated": "...",
  "slang": [
    { "term": "slang1", "meaning": "...", "example": "...", "origin": "..." }
  ]
}
Sentence: "${input}"
Only return JSON. No markdown or code block.
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error("No text in model response");
    }

    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

    const output = JSON.parse(cleanText);
    return c.json({ output });
  } catch (err) {
    console.error("Gemini error:", err);
    return c.json(
      {
        error: "Failed to process request",
        detail: err instanceof Error ? err.message : String(err),
      },
      500,
    );
  }
};

const generateEntoZTranslation = async (c: Context) => {
  try {
    const formData = await c.req.formData();
    const input = formData.get("input") as string;

    if (!input) {
      return c.json({ error: "Input is required" }, 400);
    }

    const prompt = `
Rewrite the following plain English sentence into natural Gen Z slang, prioritizing authenticity and modern usage (2024-2025). Avoid forced or outdated slang. Respond in strict JSON format with ONLY these keys: 'original', 'translated', and 'slang' (if slang is used).
{
  "original": "${input}",
  "translated": "...",
  "slang": [
    { "term": "slang1", "meaning": "...", "example": "..." }
  ]
}
Sentence: "${input}"
Only return JSON. No markdown or code block. If no slang fits, return an empty 'slang' array.
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error("No text in model response");
    }

    const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

    const output = JSON.parse(cleanText);
    return c.json({ output });
  } catch (err) {
    console.error("Gemini error:", err);
    return c.json(
      {
        error: "Failed to process request",
        detail: err instanceof Error ? err.message : String(err),
      },
      500,
    );
  }
};

export { generateZtoENTranslation, generateEntoZTranslation };
