import React, {useEffect, useRef, useState} from "react"
import {ChatMessageType} from "../ChatPage"
import {Message} from "../Message/Message"
import SNTextarea from "../../../common/common_component/textarea/SNTextarea"
import SNButton from "../../../common/common_component/button/SNButton"
import s from "./ChatMessages.module.scss"
import cn from "classnames"
import {useSelector} from "react-redux"
import {StateType} from "../../../store/store"


const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


export const ChatMessages: React.FC = () => {

    const scrollToBottom = useRef<HTMLDivElement>(null)
    const ownerId = useSelector<StateType, number | null>(state => state.auth.data.id)

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    useEffect(() => {
        scrollToBottom && scrollToBottom.current && scrollToBottom.current.scrollIntoView({behavior: "smooth"})
        // console.log(ownerId)
        // messages.length && console.log(messages[messages.length - 1].userId)
    }, [messages])

    return (
        <div className={s.allMessagesBlock}>
            {
                messages.map((m, i) => <div
                    key={i}
                    className={cn(s.message, {[s.owner]: ownerId === m.userId})}
                >
                <Message message={m}/>
            </div>)
            }
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