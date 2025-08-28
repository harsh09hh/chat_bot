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
**Multi-LLM Chatbot App** is a **fast, responsive, and customizable chatbot web app** where users can **switch between multiple LLMs** and chat with them in **real-time**.  

It is built with **React, TailwindCSS, ShadCN UI** for the frontend, and powered by an **Express backend with Vercel’s Gemini SDK** for model inference.  

---

## ✨ Screenshots  
<p align="center">
  <img src="https://github.com/harsh09hh/chat_bot/blob/66ef795edd639ff1e5a01a5a7d1e680ae366fd6e/home.png" width="400" />
  <img src="https://github.com/harsh09hh/chat_bot/blob/66ef795edd639ff1e5a01a5a7d1e680ae366fd6e/exg.png" width="400" />
</p>

---

## ✨ Features  
- 🔄 **Multi-Model Switching** — Choose from multiple LLMs (e.g., Gemini Flash, Flash-mini, etc.)  
- ⚡ **Fast & Responsive UI** — Optimized with React + Tailwind + ShadCN UI  
- 🧠 **LLM Integration via Gemini SDK** — Handles inference and responses seamlessly  
- 📤 **Streaming Responses** — Real-time AI replies with smooth rendering using React Markdown  
- 🧩 **Modular & Extensible** — Easily add more models/providers  

---

## 🛠️ Tech Stack  

### 🎨 Frontend  
- **React** – Component-based UI  
- **Tailwind CSS** – Utility-first styling  
- **ShadCN/UI** – Prebuilt, accessible UI components  
- **React Markdown** – Clean markdown rendering for AI responses  
- **Lucide Icons** – Lightweight icon set for UI  

### ⚙️ Backend  
- **Express.js** – Lightweight Node.js server  
- **Vercel Gemini SDK** – Model inference & chat completions  
- **CORS & JSON Middleware** – Secure API handling  

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
