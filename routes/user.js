const express = require("express");
const { createUser, UserSignUp } = require("../controllers/user");
const router = express.Router()

router.post("/", createUser )
router.post("/login", UserSignUp)
module.exports = router;