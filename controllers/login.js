import userDB from "../models/user.js"
import jwt from "jsonwebtoken"

const login = async (userData)=>{
  const userEmail = userData.email
  const user = await userDB.findOne({email:userEmail})
  if(!user){
    return "No user found with email: " + userEmail
  }else{
    if(user.password == userData.password){
      const token = jwt.sign({_id:user._id,username:user.fullName,email:user.email},process.env.jwtSecret,{expiresIn: '30d'})
      return "success " + token 
    }
    else{
      return "Incorrect Password..."
    }
  }
}

export default login
