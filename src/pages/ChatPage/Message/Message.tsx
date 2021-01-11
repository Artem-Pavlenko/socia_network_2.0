import React from "react"
import {ChatMessageType} from "../ChatPage";

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

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