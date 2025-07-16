
    async function Chat(content:string): Promise<string> {

    const res= await fetch("http://localhost:3001/api/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({prompt:content})
    });


     if(!res.ok){
        throw new Error("failed to anlyze the article");
                
    }


    const data= await res.json() as{response:string};
    return data.response;

}

export default Chat;
