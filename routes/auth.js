import express from "express"
import restrictToLoggedInUsers from "../middlewares/auth.js"
import signupController from "../controllers/signup.js"
import loginController from "../controllers/login.js"
import urlHandler from "../middlewares/urlHandler.js"
import logOutHandler from "../controllers/logout.js"
import ifLoggedIn from "../middlewares/ifLoggedIn.js"

const router = express.Router();

router.use((req,res,next)=>{
  const availableRoute = ["logout","signup","login","out"]
  const isValidReq = urlHandler(req.url, availableRoute)
  if(isValidReq) next()
  else return res.render("404")
})

router.get("/",restrictToLoggedInUsers,(req,res)=>{
	return res.redirect("/")
})

router.get("/logout",restrictToLoggedInUsers,logOutHandler)

router.post("/signup",signupController,(req,res)=>{
	res.render("info",{info:"User Created Successfully!",msg:"Go to login page...",href:"/auth/login"})
})

router.get("/signup",ifLoggedIn,(req,res)=>{
	res.render("signup")
})

router.get("/login",ifLoggedIn,(req,res)=>{
	res.render("login")
})

router.post("/login", async (req,res)=>{
  const dataReturned = await loginController(req.body)
  if(dataReturned.split(" ")[0] == "success"){
    res.cookie("Bearer",dataReturned.split(" ")[1])
    console.log("tarara")
    res.redirect('/')
  }else{
    res.send(`Error: ${dataReturned}`)
  }
})

router.get("/out",ifLoggedIn,(req,res)=>{
	res.render("out")
})

export default router
