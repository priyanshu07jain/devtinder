import validator from "validator";
export const validateSignUpData = (req) => {
const {firstName,lastName,emailId,password}= req.body;
if(!firstName||!lastName){
    throw new Error("fill the first name and last name");
}
else if(!validator.isEmail(emailId)){
    throw new Error("give a valid email id");
}
else if(!validator.isStrongPassword(password)){
    throw new Error("give a strong password")
}
};

export const validateProfileEdit =(req)=>{
    const allowedUpdates=["firstName","lastName","age","photoUrl","about","skills"];
    const validateUpdate=Object.keys(req.body).every((k)=>allowedUpdates.includes(k));
    return validateUpdate;
}