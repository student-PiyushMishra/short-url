import jwt from "jsonwebtoken"

function restrictToLoggedInUsers(req, res, next) {
  const token = req.cookies.Bearer
  if(!token) return res.redirect('/auth/out')
	jwt.verify(token,process.env.jwtSecret,(err,user)=>{
    if(err) return res.redirect('/auth/out')
    req.user = user
    next()
  })
  
}

export default restrictToLoggedInUsers;

