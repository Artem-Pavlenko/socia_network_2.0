import React, {useEffect, useState} from "react"
import {AddChatMessageForm} from "./AddChatMessageForm"
import {ChatMessages} from "./ChatMessages"

export const Chat: React.FC = () => {

    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)


    useEffect(() => {
        let ws: WebSocket

        const reconnect = () => {
            setTimeout(createChanel, 3000)
        }

        function createChanel() {
            // в случае если есть сокет(ws !== null) и делаем реконект нужно подчистить слушателей, которые на закрытие
            // канала 'close' делают реконект, то есть рекурсивно вызывает fn createChanel();
            // иначе будет утечка памяти

            ws?.removeEventListener('close', reconnect)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            // в случае закрытия канала
            ws.addEventListener('close', reconnect)
            setWsChanel(ws)
        }

        createChanel()

        return () => {
            ws.removeEventListener('close', reconnect)
            ws.close()
        }
    }, [])


    return (
        <div>
            <ChatMessages wsChanel={wsChanel}/>
            <AddChatMessageForm wsChanel={wsChanel}/>
        </div>
    )
}