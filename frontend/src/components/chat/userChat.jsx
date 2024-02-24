import { useContext } from 'react'
import { ChatContext } from "../../context/ChatContext";
import { Stack } from 'react-bootstrap'
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from '../../assets/avatar.svg'

const UserChat = ({chat, user}) => {
    // userChat will call fetch to find recipientUser function
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const { onlineUsers } = useContext(ChatContext)
    // if recipientId and userId is equal, means it in onlineUser's array
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?.user._id)

    return ( 
        <Stack 
            direction='horizontal' 
            gap={3} 
            className='user-card align-items-center p-2 justify-content-between'
            role='button'
        >
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height="35px"/>
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.user.name}</div>
                    <div className="text">Text-message</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">12/22/2020</div>
                <div className="this-user-notifications">2</div>
                <div className={isOnline ? 'user-online' : ''}></div>
            </div>
        </Stack> 
    );   
}
 
export default UserChat;