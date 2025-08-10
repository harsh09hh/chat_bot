


type Msg ={
  role:"user"|"assistant";
  content:string;
}

export  function getLastTenUserMessages(messages :Msg[]){

  // const usemessage =messages
  //                 .filter(m=>m.role==="user");

  // const lastTen =usemessage.length<=10 ?  usemessage : usemessage.slice(-10) 

     const lastTen = messages.filter(m=>m.role==="user").slice(-10);

    return lastTen.map(m=>`${m.role.toUpperCase()} : ${m.content}.`).join("/n");

};