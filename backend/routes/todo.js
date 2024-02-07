const express = require('express')
const router = express.Router()
const Todo = require('../controller/todo')

router.get('/', Todo.getAll)

module.exports = router