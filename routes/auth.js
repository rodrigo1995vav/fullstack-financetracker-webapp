const express = require ("express")
const router = express.Router()
const { registerCtrl, loginCtrl } = require("../controllers/auth")
const { validatorRegisterItem, validatorLoginItem } = require("../validators/auth")


router.post("/register", validatorRegisterItem, registerCtrl)

router.post("/login", validatorLoginItem, loginCtrl)





module.exports = router