import express from "express"
import handleGenerateNewShortUrl from "../controllers/url.js"
import urlHandler from "../middlewares/urlHandler.js"
import restrictToLoggedInUsers from "../middlewares/auth.js"
import deleteShortId from "../controllers/deleteShortId.js"

const router = express.Router()

router.use((req,res,next)=>{
  const isValidReq = urlHandler(req.url,["","delete","analytics"])
  if(isValidReq) next()
  else return res.render("404")
})

router.use(restrictToLoggedInUsers)

router.post('/',handleGenerateNewShortUrl)

router.post("/delete", deleteShortId)

export default router
