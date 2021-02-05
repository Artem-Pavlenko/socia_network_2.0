import React, {useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux"
import cn from "classnames"
import {StateType} from "../../../store/store"
import {Message} from "../Message/Message"
import s from "./ChatMessages.module.scss"
import {ChatMessageType} from "../../../api/chatAPI";


type ChatMessage = {
    wsChanel: WebSocket | null
}

export const ChatMessages: React.FC = () => {

    // реф для того чтобы chat-блок со скролом всегда был в конце
    const scrollToBottom = useRef<HTMLDivElement>(null)
    const ownerId = useSelector<StateType, number | null>(state => state.auth.data.id)

    // const [messages, setMessages] = useState<ChatMessageType[]>([])

    const messages = useSelector<StateType, ChatMessageType[]>(state => state.chat.messages)

    // useEffect(() => {
    //     const messageHandler = (e: MessageEvent) => {
    //         let newMessages = JSON.parse(e.data);
    //         setMessages((prevMessages) => [...prevMessages, ...newMessages])
    //     }
    //     wsChanel?.addEventListener('message', messageHandler)
    //     // если прийдёт новый сокет-канал, то сделаем (clearUp) зачистку старого канала
    //     return () => {
    //         wsChanel?.removeEventListener('message', messageHandler)
    //         // wsChanel?.close()
    //     }
    //     // в зависимости wsChanel в случае если будем делать реконект, потеряется сооединение
    //     // и чтобы подписка была на новый сокет-канал
    // }, [wsChanel])

    useEffect(() => {
        scrollToBottom && scrollToBottom.current && scrollToBottom.current.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <div className={s.allMessagesBlock}>
            {messages.map((m, i) =>
                <div key={i} className={cn(s.message, {[s.owner]: ownerId === m.userId})}>
                    <Message message={m}/>
                </div>)}
            <div ref={scrollToBottom}/>
        </div>
    )
}
