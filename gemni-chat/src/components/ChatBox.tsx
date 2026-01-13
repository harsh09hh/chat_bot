import { Globe ,Paperclip ,ArrowUp, Divide } from "lucide-react";

import Selectmodel from "./Selectmodel";
import Chat from "@/api/Chat";
import { useState,useEffect } from "react";
import MarkdownRenderer from "./Markdown";

import { getLastTenUserMessages ,getallusermessages} from "@/action/functions";


import ModelSelector from "./ModelSelector";

type Msg ={
  role:"user"|"assistant";
  content:string;
}




const ChatBox =()=>{
  const[input,setinput]=useState("");
  const [message,setmessage] =useState<Msg[]>([]);
  const [model, setModel] = useState("llama");

 useEffect(()=>{getLastTenUserMessages(message)
                getallusermessages(message)
                },[message])


  const sendmessage=async()=>{
    const text =input.trim();
    if(!text)return;


     setmessage((m)=>[...m,{role:"user",content:text} ,{ role: "assistant", content: "" }]);
    setinput("");


    let streamedReply ="";


    try{

await Chat(text, getLastTenUserMessages(message), (chunk) => {
  streamedReply += chunk + "\n";
  setmessage(prev => {
    const last = prev.length - 1;
    const updated = [...prev];
    if (updated[last].role === "assistant") {
      updated[last] = { ...updated[last], content: streamedReply };
    }
    return updated;
  });
});


setmessage(prev => {
  const last = prev.length - 1;
  const updated = [...prev];
  if (updated[last].role === "assistant") {
    updated[last] = { ...updated[last], content: streamedReply };
  }
  return updated;
});



    }
    catch(error){
      console.error(error);

    }


  };

 


   return (
    <div className="h-full flex flex-col justify-between bg-[#211c26] text-white rounded">
   
      {message.length===0 
      ?(
    <div className="flex flex-col items-center justify-center h-full text-center text-white px-4">
      <h1 className="text-3xl font-bold mb-6">How can I help you?</h1>
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        {["Create", "Explore", "Code", "Learn"].map((label) => (
          <button
            key={label}
            className="bg-[#2f2c39] hover:bg-[#3a3041] text-white py-2 px-4 rounded-md"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="w-full max-w-md text-left text-gray-300 space-y-4">
        {[
          "How does AI work?",
          'Are black holes real?',
          'How many Rs are in the word "strawberry"?',
          "What is the meaning of life?"
        ].map((q, i) => (
          <button
            key={i}
            className="block w-full text-left px-4 py-2 hover:bg-[#3a3041] rounded"
            onClick={() => {
              setinput(q);
              
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
      
      :(<div className="flex-1 p-6 overflow-y-auto ">
       {message.map((m,i)=>(
        <div
        key={i}
        className={`flex ${m.role=="user"? "justify-end":"justify-start"}  `}>

          <div
          className={`max-w-[70%] p-3 rounded-xl break-words prose prose-invert ${
          m.role === "user"
            ? "bg-[#3a2a3f] rounded-br-none"
            : "bg-[#2f2c39] rounded-bl-none"
        } `}>
            <MarkdownRenderer markdown={m.content}/>
          </div>
          

        </div>

       ))}
      </div>)}

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
              <ModelSelector selected={model} setSelected={setModel} />

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