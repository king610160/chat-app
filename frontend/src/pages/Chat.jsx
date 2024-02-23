import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/userChat";
import PotientialChats from "../components/chat/PotientialChats";
import ChatBox from '../components/chat/chatBox'

const Chat = () => {
    const { user } = useContext(AuthContext)
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext)
    // in below javascript, it will check userChats, and activate UserChat component
    return (
        <Container>
            <PotientialChats />
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="message-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading...</p>}
                        {userChats?.map((chat, index) => {
                            return (
                                <div key={index} onClick={() => updateCurrentChat(chat)}>
                                    <UserChat chat={chat} user={user}/>
                                </div>    
                            )
                        })}
                    </Stack>
                    <ChatBox />
                </Stack>
            )}
        </Container>
    );
}
 
export default Chat;