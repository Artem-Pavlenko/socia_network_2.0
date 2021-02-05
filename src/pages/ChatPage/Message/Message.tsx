import React from "react"
import s from "./Message.module.scss"
import {useSelector} from "react-redux"
import {StateType} from "../../../store/store"
import cn from "classnames";
import {ChatMessageAPIType} from "../../../api/chatAPI";

export const Message: React.FC<{ message: ChatMessageAPIType }> = ({message}) => {

    const ownerId = useSelector<StateType, number | null>(state => state.auth.data.id)

    return (
        <div className={cn(s.messBlock, {[s.owner]: ownerId === message.userId})}>
            <div className={s.author}>
                <img src={message.photo} alt={''}/>
            </div>

            <div className={s.mess}>
                <span className={s.userName}>{message.userName}</span>
                <span className={s.messText}>{message.message}</span>
            </div>
        </div>
    )
}