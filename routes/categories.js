const express = require ("express")
const router = express.Router()
const {getItems, getItem, createItem, updateItem, deleteItem} = require ("../controllers/categories")
const authMiddleware = require("../middleware/verifySession")



router.get("/", authMiddleware, getItems)

router.get("/:id", getItem)

router.put("/:id", updateItem )

router.delete("/:id", deleteItem )

router.post("/", createItem)


module.exports = router