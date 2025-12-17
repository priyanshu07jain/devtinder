import express from 'express';
import { connectDB } from './config/database.js';
import cookieParser from 'cookie-parser';
 import authRouter from './routes/auth.js';
 import profileRouter  from './routes/profile.js';
 import reqRouter from './routes/request.js';
import userRouter from './routes/user.js';

const app=express();
app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',reqRouter);
app.use('/',userRouter);




connectDB().then(()=>{
             console.log("db is connected")
             app.listen(2000,()=>{
             console.log("server is running on port 2000");
            })
            })
           .catch((err)=>console.error("errror occur",err.message))



