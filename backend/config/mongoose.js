const mongoose = require('mongoose')
const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

let uri

if (NODE_ENV === 'dev') {
    uri = MONGODB_URI
} else if (NODE_ENV === 'test') {
    uri = MONGODB_URI_TEST
}

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        mongoose.set('strictQuery', false)
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        // event emitter
        const db = mongoose.connection

        db.on('error', (error) => {
            reject(error)
        })

        db.once('open', () => {
            console.log('MongoDB connected!')
            resolve(db)
        })
    })
}

module.exports = {
    connectToDatabase
}