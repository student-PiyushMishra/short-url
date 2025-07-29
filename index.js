import express from "express"
import urlRoute from "./routes/url.js" 
import dotenv from "dotenv"
import ejs from "ejs"
import connectToMongoDB from "./connect.js"
import path from "path"
import { fileURLToPath } from 'url';
import redirectURL from "./routes/redirect.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const port = process.env.PORT || 2000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) 

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

connectToMongoDB(process.env.CONNECTION_STRING).then(()=>{
	console.log("MONGODB Connected Successfully!")
})

app.use((req,res,next)=>{
  if(!JSON.parse(process.env.availableBaseRoutes).includes(req.url.split("/")[1])){
    if(req.url.split('/').length > 2){
      res.render('404')
    }
  }
  next()
})

app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});


app.use('/url',urlRoute)
app.use("/auth",authRoutes)
app.use("/",redirectURL)

app.listen(port,()=>{
	console.log(`App is running on port: ${port}`)
})
