import type { FC } from "react";

interface SidebarboxProps {
  messages: string[];  
}

type Msg ={
    role:"user"|"assistant";
    content:string;
}


const Sidebarbox =()=>{


    return(
        <div  className=" hidden md:flex w-[250px] bg-[#1a171f] flex-col justify-between p-4  border-r border-[#2c2a33]">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-white text-center">T3.chat</h1>
                <button className="w-full  py-2 px-4 mb-4 bg-[#7b255d] hover:bg-[#922d6f] rounded text-white font-semibold "> New Chat</button>
            
            <input type="text"
            placeholder="search"
            className="w-full p-2 rounded px-4 text-sm text-white" />

            <div className="mg-6">
                <p className="text-gray-600 ">yeserday</p>
            </div>

          

            <div className="text-sm text-white flex item-center gap-2 hover:bg-[#2f2c39] p-2 rounded cursor-pointer">
                <span className="text-lg">Login</span>
            </div>


     
            </div>
        </div>
    );
}

export default Sidebarbox;