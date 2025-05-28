import express from "express";
const app= express();
import {nanoid} from "nanoid";

app.get("/api/create",(req,res)=>{    
    res.send(nanoid(7));
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

