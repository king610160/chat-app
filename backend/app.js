require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectToDatabase, shutdownToDatabase } = require('./config/mongoose')
const morgan = require('morgan')
const router = require('./routes')

const { PORT } = process.env

const app = express()

app.use(express.json())

const corsOptions = {
    origin: ["https://chat.king610160.com", "http://localhost:5173"],
    methods: ["GET", "POST"]
};

app.use(cors(corsOptions))

app.use(morgan('tiny'))

connectToDatabase()

// set router to api
app.use('/api/v1',router)

const server = app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})

module.exports = server