import React, {useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux"
import {ChatMessageAPIType} from "../../../api/chatAPI"
import {StateType} from "../../../store/store"
import s from "./ChatMessages.module.scss"
import {Message} from "../Message/Message"
import cn from "classnames"
import {ChatMessagesType} from "../../../store/chatReducer";


export const ChatMessages: React.FC = React.memo (() => {

    // реф для того чтобы chat-блок со скролом всегда был в конце
    const scrollToBottom = useRef<HTMLDivElement>(null)
    const ownerId = useSelector<StateType, number | null>(state => state.auth.data.id)
    const messages = useSelector<StateType, ChatMessagesType[]>(state => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) {
            scrollToBottom && scrollToBottom.current && scrollToBottom.current.scrollIntoView({behavior: "smooth"})
        }

    }, [messages])

    function scrollHandler(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        const element = e.currentTarget
        // если скролл на "дне", то включаем автоскролл
        // иначе если мы просто скроллим чат и не попадаем в диапазон то автоскролл выключается
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 250) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return (
        <div className={s.allMessagesBlock} onScroll={scrollHandler}>
            {messages.map((m, i) =>
                <div key={m.id} className={cn(s.message, {[s.owner]: ownerId === m.userId})}>
                    <Message message={m}/>
                </div>)}
            <div ref={scrollToBottom}/>
        </div>
    )
})
