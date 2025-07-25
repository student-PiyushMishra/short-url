import linksDb from "../models/url.js"

export default async function getUserLinks(userId){
  const links = await linksDb.find({createdBy: userId})
  const stringifiedLinks = links.map(link => ({
  _id: link._id.toString(),
  shortId: link.shortId,
  redirectUrl: link.redirectUrl,
  createdBy: link.createdBy.toString(),
  updatedAt: link.updatedAt,
  visitHistory: link?.visitHistory.map(v => ({
    timestamp: v.timestamp,
  }))
}));
  return stringifiedLinks;
}
