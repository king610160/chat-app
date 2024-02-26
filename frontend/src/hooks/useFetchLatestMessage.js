import { useContext, useEffect, useState} from 'react'
import { ChatContext } from '../context/ChatContext'
import { baseUrl, getRequest } from '../utils/services'

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext)
    const [latestMessage, setLatestMessage] = useState(null)

    useEffect(() => {
        const getMessage = async() => {
            // use chatId to find all message in this chat
            const response = await getRequest(`${baseUrl}/message/${chat._id}`)
            if (response.error) return console.log("Error message", response.error)

            // select the lastest one, and set it
            const latestMessage = response[response?.length - 1]
            setLatestMessage(latestMessage)
        }
        getMessage()
        // only when newMessage, and notifications change, this effect will happen
    }, [newMessage, notifications])
    return  {latestMessage}
}