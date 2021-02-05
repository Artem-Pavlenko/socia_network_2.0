import React, {useEffect, useState} from "react"
import {AddChatMessageForm} from "./AddChatMessageForm"
import {ChatMessages} from "./ChatMessages"
import {useDispatch} from "react-redux";
import {clearAllMessages, startMessagesListening, stopMessagesListening} from "../../../store/chatReducer";

export const Chat: React.FC = () => {

    // const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        // let ws: WebSocket
        //
        // const reconnect = () => {
        //     setTimeout(createChanel, 3000)
        // }
        //
        // function createChanel() {
        //     // в случае если есть сокет(ws !== null) и делаем реконект нужно подчистить слушателей, которые на закрытие
        //     // канала 'close' делают реконект, то есть рекурсивно вызывает fn createChanel();
        //     // иначе будет утечка памяти
        //     ws?.removeEventListener('close', reconnect)
        //     ws?.close()
        //
        //     ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        //     // в случае закрытия канала
        //     ws.addEventListener('close', reconnect)
        //     setWsChanel(ws)
        // }
        //
        // createChanel()
        dispatch(startMessagesListening())
        return () => {
            // ws.removeEventListener('close', reconnect)
            // ws.close()
            dispatch(stopMessagesListening())
            dispatch(clearAllMessages())
        }
    }, [])


    return (
        <div style={{height: '70vh'}}>
            <ChatMessages/>
            <AddChatMessageForm/>
        </div>
    )
}