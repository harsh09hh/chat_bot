    
    
    const Chat=async(prompt:string,onChunk?:(chunk:string)=>void): Promise<string> => {

    const res= await fetch("http://localhost:3001/api/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({prompt}),
    });


    const reader =res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullText="";


  if (!reader) {
    throw new Error("ReadableStream not supported");
  }



    while(true){
        const {done ,value}= await reader.read();
        if(done) break;
        const chunk = decoder.decode(value);
        const matches =chunk.match(/data:\s(.*)/g);
        
        if(matches) {
            for(const line of matches){
                const text =line.replace("data:", "" ).trim();
                
                if(text ==="[DONE]" ) return fullText;

                fullText += text
                if(onChunk) onChunk(text);
            }

        }


    }

    return fullText;


}

export default Chat;
