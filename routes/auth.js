import express from "express"
import restrictToLoggedInUsers from "../middlewares/auth.js"

const router = express.Router();

router.get("/",restrictToLoggedInUsers,(req,res)=>{
	return res.redirect("/")
})

router.get("/logout",restrictToLoggedInUsers,(req,res)=>{
	res.send("abara ka dabara")
})

router.get("/out",(req,res)=>{
	res.render("out")
})

export default router
