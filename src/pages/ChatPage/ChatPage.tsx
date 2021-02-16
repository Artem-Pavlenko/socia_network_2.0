import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import {clearAllMessages, startMessagesListening, stopMessagesListening} from "../../store/chatReducer"
import {Chat} from "./Chat/Chat"


const ChatPage: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
            dispatch(clearAllMessages())
        }
    }, [])

    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatPage







