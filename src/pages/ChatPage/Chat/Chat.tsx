import React from "react"
import {AddChatMessageForm} from "./AddChatMessageForm"
import {ChatMessages} from "./ChatMessages"

export const Chat: React.FC = () => {

    const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

    return (
        <div>
            <ChatMessages wsChanel={wsChanel}/>
            <AddChatMessageForm wsChanel={wsChanel}/>
        </div>
    )
}