const express = require ("express")
const handleLogout = require("../controllers/logout")
const router = express.Router()


router.delete("/", handleLogout)


module.exports = router