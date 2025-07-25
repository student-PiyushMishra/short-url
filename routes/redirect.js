import express from "express"
import URL from "../models/url.js"
import auth from "../middlewares/auth.js"
import getUserLinks from "../controllers/getUserLinks.js"

const router = express.Router()

router.get("/",auth, async (req,res)=>{
  const links = await getUserLinks(req.user._id)
  res.render('home',{links:JSON.stringify(links),username:req.user.username})
})

router.get("/:shortId", async(req,res)=>{
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate({shortId},{
	$push: {
	  visitHistory: {timestamp: Date.now()}
	}
	})
	if(!entry){
	   return res.render("404")
	}
	else{
	   res.redirect(entry.redirectUrl)
	}
})

export default router
