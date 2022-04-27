require("dotenv").config()

const express = require('express')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

const port = process.env.PORT || 3000

app.listen (port, () => {
    console.log(`Your app is ready and running on http://localhost:${port}`)
})
