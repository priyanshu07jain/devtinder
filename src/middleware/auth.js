import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
export const useAuth=async(req,res,next)=>{
try    
{//read the token from req.cookie
const cookie=req.cookies;
const {token}=cookie;
if(!token){
    throw new Error("please login")
}
//validate the token using jwt.verify
const decode=await jwt.verify(token,"Dev@Tinder@7");
const {_id}=decode;
//find if the user exists or not
const user=await User.findById(_id);
req.user=user;
if(!user){
    throw new Error("user not found")
}
else{
    next();
}
}
catch(err){
    res.status(400).send("Error status"+" "+err);
}
}