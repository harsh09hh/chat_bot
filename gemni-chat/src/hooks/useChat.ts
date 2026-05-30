import { useState, useCallback, useRef } from "react";
import Chat, {Message}  from "../lib/chat";

export function useChat() {
  const [messages, setMessages]     = useState<Message[]>([]);
  const [modelId,  setModelId]      = useState("gemini-2.5-flash");
  const [loading,  setLoading]      = useState(false);
  const assistantBufferRef          = useRef("");

  const sendMessage = useCallback(async (userText: string) => {
    // 1. Append the user turn immediately (for UI)
    const userMsg: Message = { role: "user", content: userText };
    const updatedHistory   = [...messages, userMsg];
    setMessages(updatedHistory);

    // 2. Placeholder assistant message for streaming
    assistantBufferRef.current = "";
    setMessages([...updatedHistory, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      await Chat(updatedHistory, modelId, (chunk) => {
        assistantBufferRef.current += chunk;
        // Update the last (assistant) message in place
        setMessages([
          ...updatedHistory,
          { role: "assistant", content: assistantBufferRef.current },
        ]);
      });
    } finally {
      setLoading(false);
    }
  }, [messages, modelId]);

  return { messages, modelId, setModelId, sendMessage, loading };
}