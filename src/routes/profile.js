import express from 'express';
const profileRouter=express.Router();
import { useAuth } from '../middleware/auth.js';
import bcrypt from 'bcrypt';
import { validateProfileEdit } from '../utiles/validation.js';
import { User } from '../models/user.js';

//profile
profileRouter.get("/profile/view",useAuth,async(req,res)=>{
try
{
const user=req.user;

res.json({message:"logged in user is ",user:user});}
catch(err){
    res.status(400).send("Error"+" "+err);
}
})

profileRouter.patch("/profile/edit",useAuth,async(req,res)=>{
    try{
     if(!validateProfileEdit(req)){
        throw new Error("this field cannot be updated");
     }
    const loggedInUser=req.user;
    Object.keys(req.body).forEach((k)=>loggedInUser[k]=req.body[k]);
    await loggedInUser.save();
    res.status(200).send("updated succesfully");
    }
    catch(err){
        res.status(400).send("Error"+" "+err);
    }
})

profileRouter.patch("/profile/password",useAuth,async(req,res)=>{
    //get the user
    try{
    const user= await User.findById(req.user._id);
    const hashPassword= await bcrypt.hash(req.body.password,10);
    console.log("old password:",user.password);
    user.password=hashPassword;
    await user.save();
    console.log("new password:",hashPassword);
    res.send("password reset succesfull");
    }
    catch(err){
        res.status(400).send("Error"+" "+err);
    }
})
export default profileRouter;