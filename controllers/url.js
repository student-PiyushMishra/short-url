import {nanoid} from "nanoid"
import URL from "../models/url.js"

async function handleGenerateNewShortUrl(req,res){
   let shortId;
	 if(req.body.customUrl){
	   shortId = req.body.customUrl
	 }else{
	   shotId = nanoid(5)
	 }
	const body = req.body;
	let orgUrl = body.redirectUrl;
	if(!orgUrl){
	  return res.status(400).json({error: "URL is REQUIRED!"})
	}
	if(orgUrl.startsWith('http://')|| orgUrl.startsWith('https://')){
	}else{
	  orgUrl = `http://${orgUrl}`
	}
	await URL.create({
    createdBy: req.user._id,
		shortId: shortId,
		redirectUrl: orgUrl,
		visitHistory: []
	})
	return res.json({id: shortId})
}

export default handleGenerateNewShortUrl;
