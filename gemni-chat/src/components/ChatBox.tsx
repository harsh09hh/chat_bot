import { Globe ,Paperclip ,ArrowUp } from "lucide-react";

import Selectmodel from "./Selectmodel";
import Chat from "@/api/Chat";
import { useState } from "react";
import MarkdownRenderer from "./Markdown";


type Msg ={
  role:"user"|"assistant";
  content:string;
}




const ChatBox =()=>{
  const[input,setinput]=useState("");
  const [message,setmessage] =useState<Msg[]>([]);


  const sendmessage=async()=>{
    const text =input.trim();
    if(!text)return;


    setmessage((m)=>[...m,{role:"user",content:text}]);
    setinput("");


    try{
      const aiReply =  await Chat(text);
      setmessage((m)=>[...m,{role:"assistant",content:aiReply}]);

    }
    catch(error){
      console.error(error);

    }


  }






   return (
    <div className="h-full flex flex-col justify-between bg-[#1e1b25] text-white rounded">
      {/*chat area*/}

      <div className="flex-1 p-6 overflow-y-auto">
      {message.map((m, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-3 rounded-lg break-words prose prose-invert ${
              m.role === "user"
                ? "self-end bg-[#3a2a3f]"
                : "self-start bg-[#2f2c39]"
            }`}
          >
            {/* Render markdown instead of plain text */}
               <MarkdownRenderer markdown={m.content} />
           </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#2c2a33]">
        <div className="bg-[#2a2633]/50 backdrop-blur-sm rounded-2xl p-4 border border-[#3a3644] w-full">
        
        
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendmessage()}
                  className="w-full bg-transparent text-white placeholder-gray-400 outline-none mb-3"
                  placeholder="Type your message here..."
                />
          <div className="flex item-center gap-2 justify-between flex-wrap">
            <div className="flex item-center gap-2 flex-wrap">
              <Selectmodel/>

              <button className="flex item-center gap-1 px-3 py-1 bg-[#1e1b25] text-sm rounded-full border border-[#3a3644] text-white hover:text-white">
                <Globe size={16}/> Search
              </button>

                <button className="flex items-center justify-center w-8 h-8 rounded-full border border-[#3a3644] text-white hover:text-white">
                <Paperclip size={16} />
              </button>
            </div>

               <button className="w-8 h-8 flex items-center justify-center bg-[#7b255d] hover:bg-[#922d6f] text-white rounded" onClick={sendmessage}>
              <ArrowUp size={16} />
            </button>

          </div>


        </div>

      </div>

    </div>
  );

}



export default ChatBox;