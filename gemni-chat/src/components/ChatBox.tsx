import { Globe, Paperclip, ArrowUp } from "lucide-react";
import Chat, { Message } from "../lib/chat";  
import { useState, useRef, useEffect } from "react";
import MarkdownRenderer from "./Markdown";
import ModelSelector from "./ModelSelector";

const SUGGESTED_QUESTIONS = [
  "How does AI work?",
  "Are black holes real?",
  'How many Rs are in the word "strawberry"?',
  "What is the meaning of life?",
];

const ChatBox = () => {
  const [input,    setInput]    = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [modelId,  setModelId]  = useState("gemini-2.5-flash"); 
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text = input) => {
    text = text.trim();
    if (!text || loading) return;

    // 1. Build the new user message and the full history to send
    const userMsg: Message    = { role: "user", content: text };
    const historyToSend       = [...messages, userMsg];  // ← full history

    // 2. Optimistically update UI (user msg + empty assistant placeholder)
    setMessages([...historyToSend, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    let streamedReply = "";

    try {
      await Chat(
        historyToSend,  // ← full messages array (not a string)
        modelId,        // ← which provider to use THIS turn
        (chunk) => {
          streamedReply += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: streamedReply };
            return updated;
          });
        }
      );
    } catch (err) {
      console.error(err);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "⚠️ Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#211c26] text-white rounded">

   
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl font-bold mb-6">How can I help you?</h1>
          <div className="flex gap-3 justify-center mb-6 flex-wrap">
            {["Create", "Explore", "Code", "Learn"].map(label => (
              <button key={label} className="bg-[#2f2c39] hover:bg-[#3a3041] py-2 px-4 rounded-md">
                {label}
              </button>
            ))}
          </div>
          <div className="w-full max-w-md text-left text-gray-300 space-y-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                className="block w-full text-left px-4 py-2 hover:bg-[#3a3041] rounded"
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex mb-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] p-3 rounded-xl break-words prose prose-invert ${
                  m.role === "user"
                    ? "bg-[#3a2a3f] rounded-br-none"
                    : "bg-[#2f2c39] rounded-bl-none"
                }`}
              >
             
                {m.role === "assistant" && m.content === "" ? (
                  <span className="animate-pulse text-gray-400">Thinking…</span>
                ) : (
                  <MarkdownRenderer markdown={m.content} />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

 
      <div className="p-4 border-t border-[#2c2a33]">
        <div className="bg-[#2a2633]/50 backdrop-blur-sm rounded-2xl p-4 border border-[#3a3644]">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none mb-3"
            placeholder="Type your message here..."
            disabled={loading}
          />

          <div className="flex items-center gap-2 justify-between flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">

              {/* ✅ ModelSelector now controls modelId sent to backend */}
              <ModelSelector selected={modelId} setSelected={setModelId} />

              <button className="flex items-center gap-1 px-3 py-1 bg-[#1e1b25] text-sm rounded-full border border-[#3a3644] text-white">
                <Globe size={16} /> Search
              </button>
              <button className="flex items-center justify-center w-8 h-8 rounded-full border border-[#3a3644] text-white">
                <Paperclip size={16} />
              </button>
            </div>

            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="w-8 h-8 flex items-center justify-center bg-[#7b255d] hover:bg-[#922d6f] disabled:opacity-50 text-white rounded"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatBox;