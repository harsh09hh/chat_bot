import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, CoreMessage } from "ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Provider registry ─────────────────────────────────────────────────────────
const google    = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY! });
const openai    = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

type ModelId =
  | "gemini-2.5-flash"
  | "gemini-2.5-flash-lite-preview-06-17"
  | "gemini-2.5-pro"
  | "o4-mini"
  | "claude-sonnet-4-5";

/** Map the frontend's model id → Vercel AI SDK model instance */
function resolveModel(modelId: ModelId) {
  switch (modelId) {
    case "gemini-2.5-flash":
      return google("gemini-2.5-flash");
    case "gemini-2.5-flash-lite-preview-06-17":
      return google("gemini-2.5-flash-lite-preview-06-17");
    case "gemini-2.5-pro":
      return google("gemini-2.5-pro");
    case "o4-mini":
      return openai("o4-mini");
    case "claude-sonnet-4-5":
      return anthropic("claude-sonnet-4-5-20251001");
    default:
      return google("gemini-2.5-flash"); // safe fallback
  }
}

// ── Chat endpoint ─────────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  // `messages` is the FULL conversation history as { role, content }[]
  // `modelId`  is which provider/model to use for THIS turn
  const { messages, modelId } = req.body as {
    messages: CoreMessage[];
    modelId: ModelId;
  };

  if (!messages?.length) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const model = resolveModel(modelId ?? "gemini-2.5-flash");

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const result = await streamText({
      model,
      system: "You are a helpful assistant. Use the conversation history to maintain context.",
      messages, // ← the entire history, regardless of which LLM produced each turn
    });

    for await (const chunk of result.textStream) {
      for (const line of chunk.split(/\r?\n/)) {
        res.write(`data: ${line}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Stream error:", err);
    res.write("data: [ERROR]\n\n");
    res.end();
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));