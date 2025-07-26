:

🧠 Multi-LLM Chatbot App
A fast, responsive, and customizable chatbot web app —  where users can choose from multiple LLMs (Large Language Models) and chat with them in real time.
Built with React, TailwindCSS, ShadCN, and powered by Express backend and Vercel’s Gemini SDK.

🚀 Features
🔄 Multi-Model Switching — Choose from multiple LLMs (e.g., Gemini Flash, Flash-mini, etc.)

⚡ Fast and responsive UI using React + Tailwind + ShadCN UI

🧠 LLM Integration via Gemini SDK — Efficient back-end inference

📤 Streaming Responses — Real-time display of responses using React Markdown

🧩 Modular and Extensible — Easy to add support for new models/providers



🛠️ Tech Stack
Frontend
React – Component-based UI

Tailwind CSS – Utility-first styling

ShadCN/UI – Reusable UI components

React Markdown – For clean markdown-rendered responses

Lucide Icons – Modern icons for model selector and chat UI

Backend
Express.js – Lightweight Node.js server

Vercel Gemini SDK – Handles chat completions based on selected LLM

CORS & JSON middleware – Secure and structured API request handling



🧩 Folder Structure


multi-llm-chatbot/
├── gemni-caht/                # React frontend
│   ├── components/        # UI Components (ChatBox, MarkdownRenderer, etc.)
│   ├── api/               # API integration with backend
│   └── ...                # Other frontend files
├── server/                # Express backend
│   ├── routes/            # API routes (chat POST endpoint)
│   └── ...                # Gemini SDK integration
├── README.md
└── ...







