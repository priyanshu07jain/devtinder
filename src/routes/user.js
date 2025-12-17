import express from "express";
import { useAuth } from "../middleware/auth.js";
import { connectionRequest } from "../models/connectionRequest.js";
import { User } from "../models/user.js";
const userRouter = express.Router();

userRouter.get("/user/requests/received", useAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId",["firstName","lastName"]);
    res
      .status(200)
      .json({
        message: "all requests here of user",
        connectionRequests: connectionRequests,
      });
  } catch (err) {
    res.status(400).send("Error" + " " + err);
  }
});

userRouter.get("/user/connections",useAuth,async(req,res)=>{
try{
 const loggedInUser=req.user;
 const connections=await connectionRequest.find({
    $or:[
        {toUserId:loggedInUser,status:"accepeted"},
        {fromUserId:loggedInUser,status:"accepeted"}
    ]
 }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"])
 const data=connections.map((row)=>{
    if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
     return row.toUserId;
    }
    return row.fromUserId;
 });
 res
      .status(200)
      .json({
        message: "all  connections of user",
        connections: data,
      });
}
catch (err) {
    res.status(400).send("Error" + " " + err);
  }
})

userRouter.get("/user/feed",useAuth,async(req,res)=>{
  //get you profile of other user
  try{
    let limit=parseInt(req.query.limit);
    limit=limit>50?50:limit;
    const page=parseInt(req.query.page);
    const skip=(page-1)*limit;
    const loggedInUser=req.user;
    const connectionRequests=await connectionRequest.find({
      $or:[
        {toUserId:loggedInUser._id},
        {fromUserId:loggedInUser._id}
      ]
    }).select("fromUserId toUserId");
    const hiddenUserFromFeed=new Set();
    connectionRequests.forEach(req => {
      hiddenUserFromFeed.add(req.fromUserId);
      hiddenUserFromFeed.add(req.toUserId);
    });
    const user= await User.find({$and:[
      {_id:{$nin:Array.from(hiddenUserFromFeed)}},
      {_id:{$ne:loggedInUser._id}},
    ],}).select("firstName lastName skills photoUrl about").skip(skip).limit(limit);
    res.status(200).send(user);
  }
  catch (err) {
      res.status(400).send("Error" + " " + err);
    }
})
export default userRouter;
