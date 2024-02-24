import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messagesError, setMessagesError] = useState(null)
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)

    // the users that had not contact with user, will label at top-left
    useEffect(() => {
        const getUsers = async() => {
            // find all users
            const response = await getRequest(`${baseUrl}/user`)
            if(response.error) return console.log('Error',response.error) 

            // check whether the user in userChat's members, if in, then select
            const pChats = response?.users.filter((u) => {
                let isChatCreated = false
                // user it's own id need not to get
                if(user.id === u._id) return false

                if(userChats) {
                    // check whether this user had message-box with other user, if is, set it to true
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated
            })

            setPotentialChats(pChats)
        }
        getUsers()
    }, [userChats])

    // get all message that this user had contacted with
    useEffect(() => {
        const getUserChats = async() => {
            if (user?.id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                
                // get all the chat between two users
                const response = await getRequest(`${baseUrl}/chat/${user.id}`)
                setIsUserChatsLoading(false)

                if(response.error) return setUserChatsError(response)
                setUserChats(response)
            }
        }
        getUserChats()
    }, [user])

    // get all message that this chat had, when currentChat, this effect will be triggered
    useEffect(() => {
        const getMessages = async() => {
            setIsMessagesLoading(true)
            setMessagesError(null)
            
            // get all the chat between two users
            const response = await getRequest(`${baseUrl}/message/${currentChat?._id}`)
            setIsMessagesLoading(false)

            if(response.error) return setMessagesError(response)
            setMessages(response)                
        }
        getMessages()
    }, [currentChat])

    const sendTextMessage = useCallback(async(text, senderId, chatId, setTextMessage) => {
        if (!text) return console.log('You must enter something...')
        const response = await postRequest(`${baseUrl}/message`, JSON.stringify({
            senderId: senderId,
            chatId: chatId,
            text: text
        }))
        if(response.error) return setSendTextMessageError(response)
        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage("")

    }, [])

    const createChat = useCallback(async(firstId, secondId) => {
        // create these two people's chat
        const response = await postRequest(
            `${baseUrl}/chat`, 
            JSON.stringify({
                firstId,
                secondId
            })
        )
        if(response.error) return console.log('error', response)

        // reset the chat in left, push new response into array
        setUserChats((prev) => [...prev, response])
    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    },[])

    return (
        <ChatContext.Provider
            value ={{ 
                userChats, 
                isUserChatsLoading, 
                userChatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                currentChat,
                messages,
                messagesError,
                isMessagesLoading,
                sendTextMessage
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}