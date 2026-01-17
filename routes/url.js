const express = require("express");
const router = express.Router();
const {GenerateShortId, getAnalytics} = require("../controllers/url");

router.post("/", GenerateShortId);

router.get("/analytics/:shortId", getAnalytics)


module.exports = router;
