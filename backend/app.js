require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectToDatabase, shutdownToDatabase } = require('./config/mongoose')
const morgan = require('morgan')
const router = require('./routes')

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://chat.king610160.com",
    methods: ["GET", "POST"]
}))

app.use(morgan('tiny'))

connectToDatabase()

// set router to api
app.use('/api/v1',router)

const server = app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})

module.exports = server