import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        Minlength:2,
        maxlength:30
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address is there");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter strong password"+" "+value);
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:`{VALUE} is not of the type gender`
        },
        // validate(value){
        // if(value==="male"||value==="female"||value==="other"){
        //     return true;
        // }
        // throw new Error("gender must be male female or other");
    // }
},
    photoUrl:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid Url");
            }
        }
    },
    about:{
        type:String,
        default:"Hey there! I am using DevTinder."
    },
    skills:{
        type:[String],
    },
    
}
,{timestamps:true});

userSchema.methods.getJWT=async function (){
    const user=this;
    const token=await jwt.sign({_id:user._id},"Dev@Tinder@7",{expiresIn:"7d"});
    return token;
};
userSchema.methods.validatePassword=async function(password){
    const user=this;
    const hashpassword=user.password;
    const isPasswordValide=await bcrypt.compare(password,hashpassword);
    return isPasswordValide;
}

export const User= mongoose.model("User",userSchema);