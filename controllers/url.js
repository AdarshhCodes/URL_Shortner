const { nanoid } = require("nanoid");
const Url = require("../models/url");

console.log("Url import is:", Url);

async function GenerateShortId(req, res) {
  console.log("Incoming body:", req.body);
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "Url is required" });
  }

  const shortID = nanoid(8);

  await Url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
   return res.render("home", {
    id: shortID 
   })

}

// ✅ Move this OUTSIDE
async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { GenerateShortId, getAnalytics };
