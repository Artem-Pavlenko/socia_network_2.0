import React, {useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux"
import {StateType} from "../../../store/store"
import {ChatMessageType} from "../ChatPage"
import {Message} from "../Message/Message"
import s from "./ChatMessages.module.scss"
import cn from "classnames"


// const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type ChatMessage = {
    wsChanel: WebSocket | null
}

export const ChatMessages: React.FC<ChatMessage> = ({wsChanel}) => {

    // реф для того чтобы chat-блок со скролом всегда был в конце
    const scrollToBottom = useRef<HTMLDivElement>(null)
    const ownerId = useSelector<StateType, number | null>(state => state.auth.data.id)

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChanel?.addEventListener('message', messageHandler)
        // если прийдёт новый сокет-канал, то сделаем (clearUp) зачистку старого канала
        return () => {
            wsChanel?.removeEventListener('message', messageHandler)
            // wsChanel?.close()
        }
        // в зависимости wsChanel в случае если будем делать реконект, потеряется сооединение
        // и чтобы подписка была на новый сокет-канал
    }, [wsChanel])

    useEffect(() => {
        scrollToBottom && scrollToBottom.current && scrollToBottom.current.scrollIntoView({behavior: "smooth"})
        // messages.length && console.log(messages[messages.length - 1].userId)
    }, [messages])

    return (
        <div className={s.allMessagesBlock}>
            {
                messages.map((m, i) =>
                    <div
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
