const express = require ("express")
const router = express.Router()
const {getItems, getLastTen, createItem, updateItem, deleteItem} = require ("../controllers/transactions")
const authMiddleware = require("../middleware/verifySession")



router.get("/", authMiddleware, getItems)

router.get("/latest", authMiddleware, getLastTen)

router.put("/:id", authMiddleware, updateItem )

router.delete("/:id", authMiddleware, deleteItem )

router.post("/", authMiddleware, createItem)


module.exports = router