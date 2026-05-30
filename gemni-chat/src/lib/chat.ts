export interface Message {
  role: "user" | "assistant";
  content: string;
}

export default async function Chat(
  messages: Message[],          // full history, not just the last prompt
  modelId: string,
  onChunk?: (chunk: string) => void
): Promise<void> {
  const res = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, modelId }),
  });

  if (!res.body) throw new Error("No response body");

  const reader  = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer    = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop()!;

    for (let line of lines) {
      line = line.trim();
      if (!line.startsWith("data:")) continue;
      const data = line.replace(/^data:\s*/, "");
      if (data === "[DONE]") return;
      if (data === "[ERROR]") throw new Error("Stream error from server");
      onChunk?.(data);
    }
  }
}