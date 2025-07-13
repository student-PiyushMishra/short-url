import express from "express"
import handleGenerateNewShortUrl from "../controllers/url.js"
import urlHandler from "../middlewares/urlHandler.js"

const router = express.Router()

router.use((req,res,next)=>{
  const isValidReq = urlHandler(req.url,["","analytics"])
  console.log(isValidReq)
  if(isValidReq) next()
  else return res.render("404")
})

router.post('/',handleGenerateNewShortUrl)

export default router
