const chatModel = require('../models/Chat')
const mongoose = require('mongoose')

// createChat
// getUserChat
// findChat

class Chat {
    // get all chat between the users
    static async createChat(req, res) {
        const {firstId, secondId} = req.body
        try {
            const chat = await chatModel.findOne({
                members: {$all: [firstId, secondId]}
            })
            // if can find the chat, then return to frontend with data
            if (chat) return res.status(200).json(chat)

            const newChat = chatModel({
                members: [firstId, secondId]
            })
            // else need to create the new chat
            const response = await newChat.save()
            return res.status(200).json(response)
        } catch(err){
            console.log(err)
            res.status(500).send({'message': err.message})
            return
        }
    }
    // get all two user's chat 
    static async getUserChat(req, res) {
        const userId = req.params.userId
        try {
            const chats = await chatModel.find({
                members: {$in: [userId]}
            })
            res.status(200).json(chats)
        } catch(err){
            console.log(err)
            res.status(500).send({'message': err.message})
            return
        }
    }
    // get specific chat
    static async findChat(req, res) {
        const {firstId, secondId} = req.params
        console.log(firstId)
        console.log(secondId)
        try {
            const chat = await chatModel.find({
                members: {$all: [firstId, secondId]}
            })
            res.status(200).json(chat)
        } catch(err){
            console.log(err)
            res.status(500).send({'message': err.message})
            return
        }
    }
}

module.exports = Chat