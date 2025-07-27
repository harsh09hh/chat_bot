// server.js (or your entry point)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const googleAi = createGoogleGenerativeAI({
  apiKey: process.env.GEMNI_API_KEY!,
});

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // ——— SSE setup ———
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const result = await streamText({
      model: googleAi("gemini-1.5-flash"),
      prompt,
    });

    // ——— Stream each chunk, splitting on newlines ———
    for await (const chunk of result.textStream) {
      // chunk may contain multiple lines or partial lines
      const lines = chunk.split(/\r?\n/);
      for (const line of lines) {
        // Optional: skip purely-empty lines if you don’t want them
        // if (!line.trim()) continue;

        // Emit each as its own SSE event
        res.write(`data: ${line}\n\n`);
      }
    }

    // ——— Final sentinel ———
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Gemini stream error:", err);
    res.write("data: [ERROR]\n\n");
    res.end();
  }
});

app.listen(3001, () => {
  console.log(" Server is running on http://localhost:3001");
});
