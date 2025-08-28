<h1 align="center">🧠 Multi-LLM Chatbot App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/REACT-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TAILWINDCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/SHADCN_UI-9333EA?style=flat-square" />
  <img src="https://img.shields.io/badge/EXPRESS.JS-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/VERCEL_GEMINI_SDK-4285F4?style=flat-square&logo=google&logoColor=white" />
</p>

---

## 🚀 Overview  

**Multi-LLM Chatbot App** is a **fast, responsive, and customizable chatbot web app** where users can **choose from multiple LLMs** and chat with them in **real time**.  

Built with **React, TailwindCSS, ShadCN UI** for the frontend, and powered by an **Express backend with Vercel’s Gemini SDK** for model inference.  

---

## ✨ Features  

- 🔄 **Multi-Model Switching** — Select from multiple LLMs (e.g., Gemini Flash, Flash-mini, etc.)  
- ⚡ **Fast & Responsive UI** — Built with React + Tailwind + ShadCN UI  
- 🧠 **LLM Integration via Gemini SDK** — Efficient backend inference handling  
- 📤 **Streaming Responses** — Real-time AI responses rendered with React Markdown  
- 🧩 **Modular & Extensible** — Easy to add new models/providers  

---

## 🛠️ Tech Stack  

### 🎨 Frontend  
- **React** – Component-based UI  
- **Tailwind CSS** – Utility-first styling  
- **ShadCN/UI** – Reusable UI components  
- **React Markdown** – Renders clean markdown AI responses  
- **Lucide Icons** – Modern icons for model selector & chat UI  

### ⚙️ Backend  
- **Express.js** – Lightweight Node.js server  
- **Vercel Gemini SDK** – Handles LLM chat completions  
- **CORS & JSON Middleware** – Secure structured API handling  

---

## 📂 Folder Structure  

```bash
multi-llm-chatbot/
├── gemni-chat/            # React frontend
│   ├── components/        # UI Components (ChatBox, MarkdownRenderer, etc.)
│   ├── api/               # API integration with backend
│   └── ...                # Other frontend files
├── server/                # Express backend
│   ├── routes/            # API routes (chat POST endpoint)
│   └── ...                # Gemini SDK integration
├── README.md
└── ...
