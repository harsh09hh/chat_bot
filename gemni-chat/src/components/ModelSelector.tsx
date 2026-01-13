import { useState, useRef } from "react";
import { Eye, Info, Sliders, Star } from "lucide-react";

type Props = {
  selected: string;
  setSelected: (m: string) => void;
};

const models = [
  {
    name: "Gemini 3 Flash",
    value: "gemini-flash",
    provider: "google",
    description: "Lightning-fast with surprising capability",
    favorite: true,
    disabled: false,
  },
  {
    name: "GPT-5.2 (Instant)",
    value: "gpt5-instant",
    provider: "openai",
    description: "OpenAI's latest with breakthrough speed and intelligence",
    premium: true,
    disabled: false,
  },
  {
    name: "Nano Banana Pro",
    value: "nano-banana",
    provider: "anthropic",
    description: "Higher fidelity image generation built on Gemini 3 Pro",
    badge: "2x",
    premium: true,
    disabled: true,
  },
  {
    name: "Gemini 3 Pro",
    value: "gemini-pro",
    provider: "google",
    description: "Google's newest flagship with advanced reasoning",
    premium: true,
    disabled: true,
  },
  {
    name: "Claude Sonnet 4.5",
    value: "claude-sonnet",
    provider: "anthropic",
    description: "Anthropic's most advanced Sonnet yet",
    premium: true,
    disabled: true,
  },
  {
    name: "Kimi K2 (0905)",
    value: "kimi-k2",
    provider: "other",
    description: "Enhanced version with longer context",
    favorite: true,
    disabled: false,
  },
];

const providers = [
  { id: "favorites", name: "Favorites", logo: "⭐" },
  { id: "openai", name: "OpenAI", logo: "◆" },
  { id: "anthropic", name: "Claude", logo: "🧠" },
  { id: "google", name: "Google", logo: "✨" },
  { id: "meta", name: "Meta", logo: "🦙" },
  { id: "deepseek", name: "DeepSeek", logo: "🔍" },
  { id: "xai", name: "xAI", logo: "✕" },
  { id: "alibaba", name: "Alibaba", logo: "🏮" },
  { id: "moonshot", name: "Moonshot", logo: "🌙" },
  { id: "zai", name: "Z.ai", logo: "Ⓩ" },
  { id: "minimax", name: "MiniMax", logo: "Ⓜ" },
];

export default function ModelSelector({ selected, setSelected }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("favorites");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filtered = models
    .filter(m => {
      if (selectedProvider === "favorites") {
        return m.favorite;
      }
      return m.provider === selectedProvider;
    })
    .filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
    );

  const currentModel = models.find(m => m.value === selected);

  return (
    <>
      {/* Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="px-3 py-1 text-sm bg-[#1e1b25] border border-[#3a3644] rounded-full hover:bg-[#2a2530] transition"
      >
        {currentModel?.name || "Select Model"}
      </button>

      {/* Overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Modal Panel */}
          <div className="fixed z-50 top-24 left-1/2 -translate-x-1/2 w-[1100px] max-w-[95vw] max-h-[500px] bg-[#1a1620] border border-[#3a3644] rounded-xl shadow-2xl flex overflow-hidden">
            
            {/* Left Sidebar - Providers */}
            <div className="w-20 border-r border-[#3a3644] bg-[#0f0c12] flex flex-col items-center py-4 gap-2 overflow-y-auto">
              {providers.map((provider, idx) => (
                <div key={provider.id}>
                  {idx === 1 && <div className="w-12 h-px bg-[#3a3644] my-1" />}
                  <button
                    onClick={() => {
                      setSelectedProvider(provider.id);
                      setSearch("");
                    }}
                    className={`flex flex-col items-center justify-center gap-1 p-3 rounded-lg transition duration-200 w-14 relative group ${
                      selectedProvider === provider.id
                        ? "bg-[#8b5cf6] text-white"
                        : "text-gray-500 hover:bg-[#2b2235] hover:text-gray-300"
                    }`}
                    title={provider.name}
                  >
                    {selectedProvider === provider.id && (
                      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8b5cf6] rounded-l-full" />
                    )}
                    <span className="text-lg">{provider.logo}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Upgrade Banner */}
              <div className="bg-gradient-to-r from-pink-950/40 to-transparent border-b border-[#3a3644] p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Unlock all models</p>
                  <p className="text-xs text-gray-400">
                    <span className="font-semibold text-pink-400">$8</span>/month
                  </p>
                </div>
                <button className="px-3 py-1.5 bg-pink-600/30 border border-pink-600 text-pink-400 text-xs rounded hover:bg-pink-600/40 transition font-semibold">
                  Upgrade
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-3 border-b border-[#3a3644] flex items-center gap-2">
                <div className="flex-1 border border-[#3a3644] rounded-lg bg-[#15121a] flex items-center px-3 py-2">
                  <input
                    className="flex-1 bg-transparent text-sm outline-none text-gray-200 placeholder-gray-600"
                    placeholder="Search models..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <button className="p-2 hover:bg-[#2b2235] rounded-lg transition flex-shrink-0">
                  <Sliders size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Models List */}
              <div className="flex-1 overflow-y-auto">
                {filtered.length > 0 ? (
                  filtered.map(m => (
                    <button
                      key={m.value}
                      disabled={m.disabled}
                      onClick={() => {
                        if (!m.disabled) {
                          setSelected(m.value);
                          setOpen(false);
                        }
                      }}
                      className={`w-full px-4 py-4 border-b border-[#2a2530] flex items-center gap-3 text-left transition ${
                        m.disabled
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[#2a1f2e] cursor-pointer"
                      }`}
                    >
                      {/* Icon and Name Section */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {m.favorite && (
                            <Star size={14} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />
                          )}
                          <span className="text-sm font-semibold text-gray-100 truncate">
                            {m.name}
                          </span>
                          {m.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-purple-600/30 border border-purple-600/50 text-purple-300 rounded font-semibold flex-shrink-0">
                              {m.badge}
                            </span>
                          )}
                          {m.premium && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="size-3.5 text-pink-500 flex-shrink-0"
                            >
                              <path d="M10.5 3 8 9l4 13 4-13-2.5-6"></path>
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate pl-0">
                          {m.description}
                        </p>
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button className="p-1.5 hover:bg-[#3a3644] rounded transition">
                          <Eye size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-[#3a3644] rounded transition">
                          <Info size={16} className="text-gray-500" />
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
