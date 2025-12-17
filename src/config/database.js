import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://cjunworthy1_db_user:LF846XwxyQs93LHi@cluster0.2q8tg8o.mongodb.net/devtinder?appName=Cluster0");
}




