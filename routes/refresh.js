const express = require ("express")
const handleRefreshToken = require("../controllers/refreshToken")
const router = express.Router()

router.post("/", handleRefreshToken)

module.exports = router