import express from "express"
import URL from "../models/url.js"

const router = express.Router()

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
