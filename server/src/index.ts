
import express, { response } from "express";
import {google} from "@ai-sdk/google"
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from 'ai';
import dotenv from "dotenv";
import cors from "cors";
import { streamText } from "ai";


dotenv.config();

const app =express();
app.use(cors());
const PORT =3001;
app.use(express.json());


const googleAi =createGoogleGenerativeAI({
    apiKey:process.env.GEMNI_API_KEY!,
});




app.get("/", (req, res) => {
  res.send(" Server is running");
});




app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const result = await streamText({
      model: googleAi('gemini-1.5-flash'),
      prompt,
    });

    for await (const chunk of result.textStream  ) {
      res.write(`data: ${chunk}\n\n`);
    }

    res.write(`data: [DONE]\n\n`);
    res.end();
  } catch (error) {
    console.error('Gemini stream error:', error);
    res.status(500).write('data: [ERROR]\n\n');
    res.end();
  }
});


app.listen(PORT,()=>{
     console.log(` Server is running on http://localhost:${PORT}`);

})

