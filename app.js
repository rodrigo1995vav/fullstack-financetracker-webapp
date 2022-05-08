require("dotenv").config()

const express = require('express')

const cors = require('cors')

const app = express()

const { dbConnectPostgres } = require('./config/postgres')

const cookieParser = require("cookie-parser")

const port = process.env.PORT || 3000

app.use(cors({ credentials: true, origin: "http://localhost:3001" }))

app.use(express.json())

app.use(cookieParser())

app.use("/api", require("./routes/"))

app.listen (port, () => {
    console.log(`Your app is ready and running on http://localhost:${port}`)
})

dbConnectPostgres()
