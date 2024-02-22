const messageModel = require('../models/Message')
const mongoose = require('mongoose')

class Message {
    static async createMessage(req, res) {
        const { chatId, senderId, text } = req.body
        const newMessage = new messageModel({
            chatId, senderId, text
        })
        try{
            const response = await newMessage.save()
            return res.status(200).json(response)
        } catch(err){
            console.log(err)
            res.status(500).send({'message': err.message})
            return
        }
    }
    static async getMessage(req, res) {
        const { chatId } = req.params
        try{
            const response = await messageModel.find({chatId})
            return res.status(200).json(response)
        } catch(err){
            console.log(err)
            res.status(500).send({'message': err.message})
            return
        }
    }
}

module.exports = Message