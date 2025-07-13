import jwt from "jsonwebtoken"

function ifLoggedIn (req,res,next){
  const token = req.cookies.Bearer
  jwt.verify(token,process.env.jwtSecret,(err,user)=>{
    if(user){
      req.user = user
      return res.redirect('/')
    }
    next()
  })
}

export default ifLoggedIn
