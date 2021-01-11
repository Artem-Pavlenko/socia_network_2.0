import React from "react"
import {ChatMessageType} from "../ChatPage"
import s from "./Message.module.scss"

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div className={s.messBlock}>
            <div className={s.author}>
                <img src={message.photo} style={{width: '50px', borderRadius: '10px'}} alt={''}/>
                <span>{message.userName}</span>
            </div>

            <div className={s.mess}>
                <span>{message.message}</span>
            </div>
        </div>
    )
}