const express = require('express')
const router = express.Router()
const Message = require('../controller/message')

router.get('/:chatId', Message.getMessage)
router.post('/', Message.createMessage)

module.exports = router