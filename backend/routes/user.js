const express = require('express')
const router = express.Router()
const User = require('../controller/user')

router.post('/register', User.register)
router.post('/login', User.login)
router.get('/find/:id', User.findUser)
router.get('/',User.getUsers)

module.exports = router