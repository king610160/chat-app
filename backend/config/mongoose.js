const mongoose = require('mongoose')
const { MONGODB_URI } = process.env

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        mongoose.set('strictQuery', false)
        mongoose.connect(MONGODB_URI, {
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

module.exports = connectToDatabase