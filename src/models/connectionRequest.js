import mongoose from "mongoose";

const connectionrRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        status:{
            type:String,
            enum:{
                values:["ignored", "interested", "accepeted", "rejected"],
                message:`{VALUE} is incorrect status type`
            }
        }
    },{timestamps:true}
)

export const connectionRequest=new mongoose.model("connectionRequest",connectionrRequestSchema);