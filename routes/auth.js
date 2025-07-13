import express from "express"
import restrictToLoggedInUsers from "../middlewares/auth.js"
import signupController from "../controllers/signup.js"
import loginController from "../controllers/login.js"

const router = express.Router();

router.get("/",restrictToLoggedInUsers,(req,res)=>{
	return res.redirect("/")
})

router.get("/logout",restrictToLoggedInUsers,(req,res)=>{
	res.send("abara ka dabara")
})

router.post("/signup",signupController,(req,res)=>{
	res.render("info",{info:"User Created Successfully!",msg:"Go to login page...",href:"/auth/login"})
})

router.get("/signup",(req,res)=>{
	res.render("signup")
})

router.get("/login",(req,res)=>{
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

router.get("/out",(req,res)=>{
	res.render("out")
})

export default router
