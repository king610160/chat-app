import { useContext } from 'react'
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from '../../context/AuthContext'

const PotientialChats = () => {
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat } = useContext(ChatContext)
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
                            <span className='user-online'></span>
                        </div>
                    )
                })}
            </div>
        </>    
    );
}
 
export default PotientialChats;