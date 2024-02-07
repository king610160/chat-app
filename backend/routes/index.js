const express = require('express')
const router = express.Router()
const todo = require('./todo')
const user = require('./user')

router.use('/todo', todo)
router.use('/user', user)

module.exports = router