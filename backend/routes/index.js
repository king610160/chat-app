const express = require('express')
const router = express.Router()

const user = require('./user')
const chat = require('./chat')
const message = require('./message')

router.use('/user', user)
router.use('/chat', chat)
router.use('/message', message)

module.exports = router