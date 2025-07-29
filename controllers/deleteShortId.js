import urlDb from "../models/url.js"

export default async function deleteShortId(req,res){
  await urlDb.deleteOne({shortId: req.body.shortId})
  res.redirect('/')	
}
