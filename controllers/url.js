import {nanoid} from "nanoid"
import URL from "../models/url.js"

async function handleGenerateNewShortUrl(req,res){
	const body = req.body;
	let orgUrl = body.url;
	if(!orgUrl){
	  return res.status(400).json({error: "URL is REQUIRED!"})
	}
	const shortId = nanoid(7);
	if(orgUrl.startsWith('http://')|| orgUrl.startsWith('https://')){
	}else{
	  orgUrl = `http://${orgUrl}`
	}
	await URL.create({
		shortId: shortId,
		redirectUrl: orgUrl,
		visitHistory: []
	})
	return res.json({id: shortId})
}

export default handleGenerateNewShortUrl;
