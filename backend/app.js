require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectToDatabase, shutdownToDatabase } = require('./config/mongoose')
const morgan = require('morgan')
const router = require('./routes')

const { PORT } = process.env
const port = PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())

app.use(morgan('tiny'))

connectToDatabase()

// set router to api
app.use('/api/v1',router)

const server = app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

module.exports = server