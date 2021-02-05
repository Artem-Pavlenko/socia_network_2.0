import React from 'react'
import {AddChatMessageForm} from './AddChatMessageForm'
import {ChatMessages} from './ChatMessages'
import {useSelector} from "react-redux";
import {StateType} from "../../../store/store";
import {ChatType} from "../../../store/chatReducer";

export const Chat: React.FC = () => {

    const {status} = useSelector<StateType, ChatType>(state => state.chat)

    return (
        <div style={{height: '70vh'}}>
            {status === "error" && <div>Some error occurred. Please refresh page...</div>}
            <ChatMessages/>
            <AddChatMessageForm/>
        </div>
    )
}