import React, {useEffect, useRef, useState} from "react"
import {ChatMessageType} from "../ChatPage"
import {Message} from "../Message/Message";
import SNTextarea from "../../../common/common_component/textarea/SNTextarea";
import SNButton from "../../../common/common_component/button/SNButton";

const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


export const ChatMessages: React.FC = () => {

    const scrollToBottom = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    useEffect(() => {
        scrollToBottom && scrollToBottom.current && scrollToBottom.current.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, i) => <Message key={i} message={m}/>)}
            <div ref={scrollToBottom}/>
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
                <SNTextarea
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                ></SNTextarea>
            </div>
            <div>
                <SNButton buttonText={'send'} onClick={sendMessage}/>
            </div>
        </div>
    )
}