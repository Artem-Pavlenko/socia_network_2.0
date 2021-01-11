import React, {useEffect, useState} from "react"
import {ChatMessageType} from "../ChatPage"
import {Message} from "../Message/Message";

const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


export const ChatMessages: React.FC = () => {

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

export const AddChatMessageForm: React.FC = () => {

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