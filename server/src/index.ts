import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

import type { Request, Response } from "express";

import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const googleAi = createGoogleGenerativeAI({
  apiKey: process.env.GEMNI_API_KEY!,
});

// app.post("/api/chat", async (req, res) => {
//   const { prompt ,lastten } = req.body;
//   if (!prompt) {
//     return res.status(400).json({ error: "Prompt is required" });
//   }

//   try {
    
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache, no-transform");
//     res.setHeader("Connection", "keep-alive");
//     res.flushHeaders?.();






//     const result = await streamText({
//       model: googleAi("gemini-1.5-flash"),
//       prompt :` You are a helpful chatbot.
//                 You will be provided with:
//                 1. **lastten** - the last 10 exchanges between the user and assistant.
//                 2. **prompt** - the user's current question.

//                 If relevant, use the context from **lastten** to help answer **prompt**.
//                 Respond **only** to the current prompt; do not repeat the lastten text.

//                lastten:${lastten}
//                prompt:${prompt}`,
//     });

    
//     for await (const chunk of result.textStream) {
      
//       const lines = chunk.split(/\r?\n/);
//       for (const line of lines) {
       
//         res.write(`data: ${line}\n\n`);
//       }
//     }

//     res.write("data: [DONE]\n\n");
//     res.end();
//   } catch (err) {
//     console.error("Gemini stream error:", err);
//     res.write("data: [ERROR]\n\n");
//     res.end();
//   }
// });





app.post("/api/chat", async (req: Request, res: Response) => {
  const { prompt, lastten } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const axiosResponse = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        stream: true,
        messages: [
          {
            role: "system",
            content: `You are a helpful chatbot.
Use lastten only as context, but respond only to the current prompt.
lastten: ${lastten}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        responseType: "stream",
      }
    );

    axiosResponse.data.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      if (!text.trim()) return;

      const lines = text.split(/\r?\n/);

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;

        const payload = line.replace("data:", "").trim();

        if (payload === "[DONE]") {
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        }

        try {
          const json = JSON.parse(payload);

          const content =
            json?.choices?.[0]?.delta?.content ?? "";

          if (content) {
            res.write(`data: ${content}\n\n`);
          }
        } catch {
          // ignore keepalive / malformed lines
        }
      }
    });

    axiosResponse.data.on("end", () => {
      res.write("data: [DONE]\n\n");
      res.end();
    });

    axiosResponse.data.on("error", () => {
      res.write("data: [ERROR]\n\n");
      res.end();
    });

  } catch (error) {
    console.error("HF API error:", error);
    res.status(500).json({ error: "Streaming failed" });
  }
});



app.listen(3001, () => {
  console.log(" Server is running on http://localhost:3001");
});
