import { useContext } from 'react'
import { ChatContext } from "../../context/ChatContext";
import { Stack } from 'react-bootstrap'
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from '../../assets/avatar.svg'
import { unreadNotificationsFunc } from '../../utils/unreadNotification';
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage';
import moment from 'moment'

const UserChat = ({chat, user}) => {
    // userChat will call fetch to find recipientUser function
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const { onlineUsers, notifications, markThisNotificationAsRead } = useContext(ChatContext)
    const { latestMessage } = useFetchLatestMessage(chat)

    // filter all unread notification
    const unreadNotifications = unreadNotificationsFunc(notifications)

    // filter this people's notifications, about 17, 1:00:00
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId === recipientUser?.user._id
    )

    // if recipientId and userId is equal, means it in onlineUser's array
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?.user._id)

    // to not to let text so many
    const truncateText = (text) => {
        let shortText = text.substring(0,20)
        if(text.length > 20) {
            shortText = shortText + '...'
        }
        return shortText
    }

    return ( 
        <Stack 
            direction='horizontal' 
            gap={3} 
            className='user-card align-items-center p-2 justify-content-between'
            role='button'
            onClick={() => {
                if(thisUserNotifications?.length) markThisNotificationAsRead(thisUserNotifications,notifications)
            }}
        >
            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height="35px"/>
                </div>
                <div className="text-content">
                    <div className="name">{recipientUser?.user.name}</div>
                    <div className="text">{
                        latestMessage?.text && (<span>{truncateText(latestMessage?.text)}</span>)
                    }</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
                <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : null}>
                    {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ''}
                </div>
                <div className={isOnline ? 'user-online' : ''}></div>
            </div>
        </Stack> 
    );   
}
 
export default UserChat;