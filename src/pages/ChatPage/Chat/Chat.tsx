import React from "react"
import {AddChatMessageForm, ChatMessages} from "./ChatMessages";

export const Chat: React.FC = () => {

    return (
        <div>
            <ChatMessages/>
            <AddChatMessageForm/>
        </div>
    )
}