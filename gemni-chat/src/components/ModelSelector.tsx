import { useState } from "react";

type Props = {
  selected: string;
  setSelected: (m: string) => void;
};

const models = [
  { name: "LLaMA 3", value: "llama", default: true },
  { name: "Gemini 1.5 Flash", value: "gemini" },
  { name: "Claude Sonnet 4.5", value: "claude" },
  { name: "GPT-4 Mini", value: "gpt4" },
];

export default function ModelSelector({ selected, setSelected }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = models.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 text-sm bg-[#1e1b25] border border-[#3a3644] rounded-full"
      >
        {selected.toUpperCase()}
      </button>

      {/* Overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Center Panel */}
          <div className="fixed z-50 top-1/2 left-1/2 w-[380px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 bg-[#1f1a26] border border-[#3a3644] rounded-xl shadow-2xl">

            {/* Search */}
            <div className="p-3 border-b border-[#2c2a33]">
              <input
                className="w-full bg-[#15121a] text-sm px-3 py-2 rounded-md outline-none"
                placeholder="Search models..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto">
              {filtered.map(m => (
                <button
                  key={m.value}
                  onClick={() => {
                    setSelected(m.value);
                    setOpen(false);
                  }}
                  className="w-full flex justify-between items-center px-4 py-3 hover:bg-[#2b2235]"
                >
                  <span>{m.name}</span>

                  {m.default && (
                    <span className="text-xs bg-pink-600 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </button>
              ))}
            </div>

          </div>
        </>
      )}
    </>
  );
}
