import { LogIn, Plus } from "lucide-react";
import { useState } from "react";

const Sidebarbox = () => {
  const [search, setSearch] = useState("");

  // Example conversation lists
  const last7Days = ["Meaning of Life "];
  const last30Days = [
    "React Chatbot Message Func...",
    "Sci-fi novel outline in post-ap..."
  ];

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#1a1120] via-[#140e19] to-[#0c0810] text-white flex flex-col">
    
      <div className="p-4 flex-1 overflow-y-auto">
     
        <h1 className="text-lg font-semibold text-white mb-4">T3.chat</h1>

        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 mb-4 bg-gradient-to-r from-[#7b255d] to-[#5a1b43] hover:from-[#922d6f] hover:to-[#6e2454] rounded-md text-white text-sm font-medium">
          <Plus size={14} /> New Chat
        </button>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search your threads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-1.5 px-3 rounded-md bg-[#19141d] text-sm text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <div className="text-xs text-pink-400 mb-1">Last 7 Days</div>
          {last7Days.map((item, idx) => (
            <div
              key={idx}
              className="text-sm text-white truncate hover:bg-[#2a1d25] p-2 rounded cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <div className="text-xs text-pink-400 mb-1">Last 30 Days</div>
          {last30Days.map((item, idx) => (
            <div
              key={idx}
              className="text-sm text-white truncate hover:bg-[#2a1d25] p-2 rounded cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-[#2c2a33]">
        <div className="flex items-center gap-2 text-sm text-white hover:bg-[#2f2c39] p-2 rounded cursor-pointer">
          <LogIn size={14} /> Login
        </div>
      </div>
    </div>
  );
};

export default Sidebarbox;
