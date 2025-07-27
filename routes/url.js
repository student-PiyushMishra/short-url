import express from "express"
import handleGenerateNewShortUrl from "../controllers/url.js"
import urlHandler from "../middlewares/urlHandler.js"
import restrictToLoggedInUsers from "../middlewares/auth.js"

const router = express.Router()

router.use((req,res,next)=>{
  const isValidReq = urlHandler(req.url,["","analytics"])
  if(isValidReq) next()
  else return res.render("404")
})

router.post('/',restrictToLoggedInUsers,handleGenerateNewShortUrl)

export default router
