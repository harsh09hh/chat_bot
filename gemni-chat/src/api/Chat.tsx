// src/api/Chat.ts
export default async function Chat(
  prompt: string,
  onChunk?: (chunk: string) => void
): Promise<void> {
  const res = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // 1) Decode and log the raw incoming string
    const chunkStr = decoder.decode(value, { stream: true });
    

    // 2) Append to our buffer
    buffer += chunkStr;

    // 3) Split complete lines; keep the last (possibly partial) one in buffer
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop()!;

    // 4) Process each complete line
    for (let line of lines) {
      line = line.trim();
      if (!line.startsWith("data:")) continue;

      const data = line.replace(/^data:\s*/, "");
      console.log("🔹 parsed data:", JSON.stringify(data));

      if (data === "[DONE]") {
        return;
      }
      onChunk?.(data);
    }
  }

  // 5) After stream ends, flush any trailing "data:" line in buffer
  if (buffer.startsWith("data:")) {
    const data = buffer.replace(/^data:\s*/, "").trim();
    console.log("🔹 final data:", JSON.stringify(data));
    if (data !== "[DONE]") onChunk?.(data);
  }
}
