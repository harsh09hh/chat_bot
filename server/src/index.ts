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
  const { prompt ,lastten } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const result = await streamText({
      model: googleAi("gemini-1.5-flash"),
      prompt :` You are a helpful chatbot.
                You will be provided with:
                1. **lastten** - the last 10 exchanges between the user and assistant.
                2. **prompt** - the user's current question.

                If relevant, use the context from **lastten** to help answer **prompt**.
                Respond **only** to the current prompt; do not repeat the lastten text.

               lastten:${lastten}
               prompt:${prompt}`,
    });

    
    for await (const chunk of result.textStream) {
      
      const lines = chunk.split(/\r?\n/);
      for (const line of lines) {
       
        res.write(`data: ${line}\n\n`);
      }
    }

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
