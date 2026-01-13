import { useState } from "react";
import { Eye, Settings, Sliders } from "lucide-react";

type Props = {
  selected: string;
  setSelected: (m: string) => void;
};

const models = [
  {
    name: "GPT-5.2 (Instant)",
    value: "gpt5-instant",
    provider: "openai",
    description: "OpenAI's latest with groundbreaking speed and intelligc...",
    premium: true,
    tags: ["Subscription Required"],
  },
  {
    name: "GPT ImageGen 1.5",
    value: "gpt-imagegen",
    provider: "openai",
    description: "OpenAI's latest and greatest image generation model",
    premium: true,
  },
  {
    name: "GPT-5.2 (Reasoning)",
    value: "gpt5-reasoning",
    provider: "openai",
    description: "GPT-5.2 with visible reasoning for complex tasks",
    premium: true,
  },
  {
    name: "GPT-5 mini",
    value: "gpt5-mini",
    provider: "openai",
    description: "Smaller, faster GPT-5 with reasoning",
  },
  {
    name: "GPT OSS 20B",
    value: "gpt-oss-20b",
    provider: "openai",
    description: "OpenAI's small open model",
  },
  {
    name: "GPT OSS 120B",
    value: "gpt-oss-120b",
    provider: "openai",
    description: "OpenAI's large open model",
  },
];

const providers = [
  { id: "openai", name: "OpenAI", icon: "⚡" },
  { id: "anthropic", name: "Anthropic", icon: "🧠" },
  { id: "google", name: "Google", icon: "🔍" },
  { id: "meta", name: "Meta", icon: "👤" },
  { id: "xai", name: "xAI", icon: "✨" },
  { id: "mistral", name: "Mistral", icon: "🎯" },
];

export default function ModelSelector({ selected, setSelected }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("openai");

  const filtered = models
    .filter(m => m.provider === selectedProvider)
    .filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
    );

  const currentModel = models.find(m => m.value === selected);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 text-sm bg-[#1e1b25] border border-[#3a3644] rounded-full hover:bg-[#2a2530] transition"
      >
        {currentModel?.name || "Select Model"}
      </button>

      {/* Overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="fixed z-50 top-1/2 left-1/2 w-[900px] max-w-[95vw] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[#1a1620] border border-[#3a3644] rounded-xl shadow-2xl flex">
            
            {/* Sidebar */}
            <div className="w-20 border-r border-[#3a3644] flex flex-col items-center py-4 gap-6">
              {providers.map(provider => (
                <button
                  key={provider.id}
                  onClick={() => {
                    setSelectedProvider(provider.id);
                    setSearch("");
                  }}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition ${
                    selectedProvider === provider.id
                      ? "bg-[#4a3f52] border border-[#8b5cf6]"
                      : "hover:bg-[#2b2235]"
                  }`}
                  title={provider.name}
                >
                  {provider.icon}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-[#3a3644] flex items-center gap-3">
                <input
                  className="flex-1 bg-[#15121a] text-sm px-4 py-2 rounded-lg outline-none text-gray-200 placeholder-gray-500"
                  placeholder="Search models..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                />
                <button className="p-2 hover:bg-[#2b2235] rounded-lg transition">
                  <Sliders size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Models List */}
              <div className="flex-1 overflow-y-auto">
                {filtered.length > 0 ? (
                  filtered.map(m => (
                    <button
                      key={m.value}
                      onClick={() => {
                        setSelected(m.value);
                        setOpen(false);
                      }}
                      className="w-full px-4 py-4 border-b border-[#2a2530] hover:bg-[#2a1f2e] transition flex items-start justify-between text-left"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-100 font-medium">
                            {m.name}
                          </span>
                          {m.premium && (
                            <span className="text-xs px-2 py-0.5 bg-[#8b5cf6] text-white rounded">
                              Premium
                            </span>
                          )}
                          {m.tags?.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-red-600 text-white rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {m.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-1.5 hover:bg-[#3a3644] rounded transition">
                          <Eye size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-[#3a3644] rounded transition">
                          <Settings size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No models found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#3a3644] text-xs text-gray-600">
                📦 13 legacy models
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
