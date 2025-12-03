import express from 'express';

const app=express();

app.use('/',(req,res)=>{
    res.send("Hello from the server");
})

app.listen(2000,()=>{
    console.log("server is running on port 2000");
})