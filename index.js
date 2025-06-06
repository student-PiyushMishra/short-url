import express from "express"
import urlRoute from "./routes/url.js" 
import dotenv from "dotenv"
import connectToMongoDB from "./connect.js"
import URL from "./models/url.js"

dotenv.config()
const app = express()

connectToMongoDB(process.env.CONNECTION_STRING).then(()=>{
	console.log("MONGODB Connected Successfully!")
})

app.use(express.json())
app.use('/url',urlRoute)

app.get("/:shortId", async(req,res)=>{
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate({shortId},{
	$push: {
	  visitHistory: {timestamp: Date.now()}
	}
	})
	res.redirect(entry.redirectUrl)
:})

app.listen(2000,()=>{
	console.log(`App is running on port: 2000`)
})
