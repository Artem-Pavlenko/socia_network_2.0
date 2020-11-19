import React from "react";
import s from "../Messages/Messages.module.scss"

type Message = {
    text?: string
}

const Messages = React.memo((props: Message) => {

    return (
        <div className={s.messBlock}>
            <span>{props.text}</span>
        </div>
    )
})

export default Messages