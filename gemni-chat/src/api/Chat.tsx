const Chat = async (
  prompt: string,
  onChunk?: (chunk: string) => void
): Promise<string> => {
  const res = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (!reader) throw new Error("ReadableStream not supported");

  let fullText = "";
  let partial = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    partial += chunk;

    const lines = partial.split("\n");
    partial = lines.pop() || ""; // Save incomplete line for next iteration

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;

      const text = line.replace(/^data:\s*/, "").trim();

      if (text === "[DONE]") return fullText;

      fullText += text;
      if (onChunk) onChunk(text);
    }
  }

  return fullText;
};

export default Chat;
