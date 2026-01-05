import './App.css'
import Sidebarbox from './components/Sidebarbox'
import ChatBox from './components/ChatBox'
import { useState } from "react";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className='flex h-screen bg-[#1e1b25] text-white relative'>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[260px] bg-[#211c26]">
        <Sidebarbox />
      </aside>

      {/* Mobile Overlay */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden 
          ${openSidebar ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpenSidebar(false)}
      />

      {/* Slide Panel */}
      <aside
        className={`fixed left-0 top-0 h-full w-[260px] bg-[#211c26] z-50 shadow-lg 
        transition-transform duration-300 md:hidden
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >

        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-[#2c2a33]">
          <h2 className="text-lg font-semibold">Menu</h2>

          <button
            onClick={() => setOpenSidebar(false)}
            className="w-9 h-9 flex items-center justify-center rounded bg-[#2f2c39] hover:bg-[#3a3041]"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="h-[calc(100%-56px)] overflow-y-auto">
          <Sidebarbox />
        </div>

      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col">

        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center gap-3 p-3 border-b border-[#2c2a33]">
          <button
            onClick={() => setOpenSidebar(true)}
            className="w-9 h-9 flex items-center justify-center rounded bg-[#2f2c39] hover:bg-[#3a3041]"
          >
            <div className="space-y-1">
              <span className="block w-5 h-[2px] bg-white" />
              <span className="block w-5 h-[2px] bg-white" />
              <span className="block w-5 h-[2px] bg-white" />
            </div>
          </button>

          <h1 className="text-lg font-semibold">Chat</h1>
        </div>

        <ChatBox />
      </main>
    </div>
  );
}

export default App;
