import express from 'express';
const authRouter =express.Router();
import { validateSignUpData } from '../utiles/validation.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

//for user signup
authRouter.post("/signup",async(req,res)=>{

  try { //validation
    validateSignUpData(req);

    //hash password
    const {firstName,lastName,emailId,skills,password}=req.body;
    const hashPassword= await bcrypt.hash(password,10);
    console.log(hashPassword);
    const user= new User({
        firstName,
        lastName,
        emailId,
        skills,
        password:hashPassword
    });
   await user.save();

   res.status(200).json({
    message:"user created successfully"
    });}
    catch (err) {
    res.status(400).json({
        message: "Error",
        error: err.message
    });
}
})

//for user login
authRouter.post("/login",async(req,res)=>{
try{const {emailId,password}=req.body;
//check user email is valid
const user=await User.findOne({emailId})
if(!user){
    res.status(400).send("invalid credentials email");
}
const comparePassword=await user.validatePassword(password);
if(comparePassword){
    const token=await user.getJWT();
    res.cookie("token",token);
   res.status(200).json({message:"logged in succesfully"});
}
else{
    res.status(400).send("invalid credentials passwoed");
}
}
catch(err){
    res.status(400).send("invalid credentials"+" "+err);
}

})

//for user logout
authRouter.post("/logout",async(req,res)=>{
    try{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("user is logged out");}
    catch(err){
        res.status(400).send("Error"+" "+err);
    }
})

export default authRouter;