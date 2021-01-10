import React, {useEffect, useState} from "react"

const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx\n')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {

    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatPage

const Chat: React.FC = () => {

    return (
        <div>
            <ChatMessages/>
            <AddChatMessageForm/>
        </div>
    )
}

const ChatMessages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, i) => <Message key={i} message={m}/>)}
        </div>
    )
}
const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {


    return (
        <div>
            <img src={message.photo} style={{width: '50px', borderRadius: '10px'}} alt={''}/>
            <b>{message.userName}</b>
            <br/>
            <span>
                {message.message}
            </span>
            <hr/>
        </div>
    )
}

const AddChatMessageForm: React.FC = () => {

    const [value, setValue] = useState<string>('')

    const sendMessage = () => {
        if (value) {
            wsChanel.send(value)
            setValue('')
        }

    }

    return (
        <div>
            <div>
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                ></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}