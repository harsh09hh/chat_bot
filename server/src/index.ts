
import express, { response } from "express";
import {google} from "@ai-sdk/google"
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from 'ai';
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app =express();
app.use(cors());
const PORT =3001;
app.use(express.json());


const googleAi =createGoogleGenerativeAI({
    apiKey:process.env.GEMNI_API_KEY!,
});




app.get("/", (req, res) => {
  res.send(" Server is running");
});





app.post('/api/chat',async(req,res)=>{
    const {prompt}= req.body;
    if(!prompt){
        res.status(500).json({error:"prompt is required"});
    }

    try{

        const result  =await generateText({
            model:googleAi('gemini-1.5-flash'),
            prompt:prompt,
        })
        res.json({response: result.text});


    }catch(error){
        console.error("Gemni error",error);
        res.status(500).json({error:"failed to generate resonse"});

    }




})


app.listen(PORT,()=>{
     console.log(` Server is running on http://localhost:${PORT}`);

})

