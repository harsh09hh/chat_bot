
export default async function Chat(
  prompt: string,
  lastten:string,
  onChunk?: (chunk: string) => void
): Promise<void> {
  const res = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt ,lastten } ),
  });
  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunkStr = decoder.decode(value, { stream: true });

    buffer += chunkStr;

    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop()!;

 
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

  if (buffer.startsWith("data:")) {
    const data = buffer.replace(/^data:\s*/, "").trim();
    console.log("🔹 final data:", JSON.stringify(data));
    if (data !== "[DONE]") onChunk?.(data);
  }
}
