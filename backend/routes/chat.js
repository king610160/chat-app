const express = require('express')
const router = express.Router()
const Chat = require('../controller/chat')

router.get('/find/:firstId/:secondId', Chat.findChat)
router.get('/:userId', Chat.getUserChat)
router.post('/', Chat.createChat)

module.exports = router