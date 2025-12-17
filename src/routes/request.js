import express from 'express'
const reqRouter =express.Router();
import { useAuth } from '../middleware/auth.js';
import { connectionRequest } from '../models/connectionRequest.js';
import { User } from '../models/user.js';

reqRouter.post("/request/send/:status/:userId",useAuth,async(req,res)=>{
    try{const fromUserId=req.user._id;
    const toUserId=req.params.userId;
    const status=req.params.status;
    const allowedStatus=["ignored", "interested"];
    if(!allowedStatus.includes(status)){
     throw new Error("invlalid status");
    }
    if(toUserId==fromUserId){
        throw new Error("invlalid connection Request");
    }
    const toUser= await User.findById(toUserId);
    if(!toUser){
        throw new Error("User not found");
    }
    const alreadyExits= await connectionRequest.findOne({$or:
        [
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},]
        });
    if(alreadyExits){
        throw new Error("invlalid connction already exists");
    }
    const ConnectionRequest= new connectionRequest({
        fromUserId,
        toUserId,
        status
    });
    const data= await ConnectionRequest.save();
    res.status(200).json({message:req.user.firstName+" "+status+" "+toUser.firstName,data:data}
    );}
    catch(err){
        res.status(400).send("Error"+" "+err);
    }
})

reqRouter.post("/request/review/:status/:requestId",useAuth,async(req,res)=>{

   try {
    const loggedInUser=req.user._id;
    const{status,requestId}=req.params;

    const allowedStatus=["accepeted", "rejected"];
    if(!allowedStatus.includes(status)){
        throw new Error("status is invalid")
    }
    const connectionReq= await connectionRequest.findOne({_id:requestId,toUserId:loggedInUser,status:"interested"});
    if(!connectionReq){
        return res.status(404).send("request not found");
    }

    connectionReq.status=status;
    await connectionReq.save();
      
    res.status(200).json({message:req.user.firstName+" has "+status+" your request "});
}
    catch(err){
        res.status(400).send("Error"+" "+err);
    }
})

export default reqRouter;