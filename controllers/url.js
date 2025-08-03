import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortUrl(req, res) {
  let shortId = nanoid(5);
  const body = req.body;
  let orgUrl = body.redirectUrl.trim();
  if (body.customUrl.length > 1) {
    const url = await URL.findOne({ shortId: body.customUrl });
    if (url.length != 0) {
      return res.render("info", {
        info: "The shortId already exists...",
        msg: "Enter another shortId or kindly leave it blank we would handle it. Go back and resubmit the form... Sorry for your inconvenience...",
        href: "/",
      });
    } else {
      shortId = body.customUrl;
    }
  }
  if (!orgUrl) {
    return res.status(400).json({ error: "URL is REQUIRED!" });
  }
  if (orgUrl.startsWith("http://") || orgUrl.startsWith("https://")) {
  } else {
    orgUrl = `http://${orgUrl}`;
  }
  await URL.create({
    createdBy: req.user._id,
    shortId: shortId,
    redirectUrl: orgUrl,
    visitHistory: [],
  });
  return res.redirect("/");
}

export default handleGenerateNewShortUrl;
