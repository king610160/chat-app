require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectToDatabase = require('./config/mongoose')
const morgan = require('morgan')
const router = require('./routes')

const { PORT } = process.env
const port = PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())

app.use(morgan('tiny'))

async function startServer() {
    try {
        // start server first, and then start route
        await connectToDatabase()

        // set router to api
        app.use('/api/v1',router)

        app.listen(port, () => {
            console.log(`App is listening on port ${port}`)
        })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

startServer()