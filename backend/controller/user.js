const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const validator = require('validator')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

class User {
    static createToken(id) {
        return jwt.sign({id}, JWT_SECRET, {expiresIn: '3d'})
    }
    static async register(req, res) {
        try {
            const { name, email, password } = req.body
            let user = await userModel.findOne({email})
            if (user) return res.status(409).json('Invalid mail or password.')

            // error fields
            if (!(name && email && password)) return res.status(401).json('All fields are required.')
            if (!validator.isEmail(email)) return res.status(401).json('Invalid mail or password.')

            let hashPassword = await bcrypt.hash(password,10)
            user = new userModel({
                name,
                email,
                password: hashPassword
            })
            await user.save()
            const id = user._id.toString()
            const token = User.createToken(id)
            res.status(200).json({id, name, email, token})
            return
        } catch (err) {
            console.log(err)
            res.status(500).send('Internal Server Error', err)
            return
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body
            if (!(email && password)) return res.status(401).json('All fields are required.')

            let user = await userModel.findOne({email}).select('+password')
            if (!user) return res.status(404).json('Invalid email or password.')
            const result = await bcrypt.compare(password, user.password)
            if (!result) return res.status(404).json('Invalid email or password.')

            const id = user._id.toString()
            const token = User.createToken(id)
            res.status(200).json({id, email, name: user.name, token})
            return
        } catch(err) {
            console.log(err)
            res.status(500).send('Internal Server Error', err)
            return
        }
    }
    static async findUser(req, res) {
        try {
            const { id } = req.params
            const check = mongoose.Types.ObjectId.isValid(id)
            if (!check) return res.status(404).json('There is no this user')

            const user = await userModel.findById(id)
            res.status(200).json({user})
            return
        } catch(err) {
            console.log(err)
            res.status(500).send('Internal Server Error', err)
            return
        }
    }
    static async getUsers(req, res) {
        try {
            const users = await userModel.find()
            if (!users) return res.status(404).json('There is no user data')
            res.status(200).json({users})
            return
        } catch(err) {
            console.log(err)
            res.status(500).send('Internal Server Error', err)
            return
        }
    }
}

module.exports = User