import { useContext } from 'react'
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from '../../context/AuthContext'

const PotientialChats = () => {
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext)
    return (
        <>
            <div className="all-users">
                {PotientialChats && potentialChats.map((u, index) => {
                    return (
                        <div 
                            className="single-user" 
                            key={index}
                            onClick={() => createChat(user.id, u._id)}
                        >
                            {u.name}
                            {/* use online user to check which user is online */}
                            <span className={
                                onlineUsers?.some((user) => user?.userId===u?._id) ? "user-online" : ""
                            }>    
                            </span>
                        </div>
                    )
                })}
            </div>
        </>    
    );
}
 
export default PotientialChats;