import React, {useEffect, useRef, useState} from "react"
import {useSelector} from "react-redux"
import {StateType} from "../../../store/store"
import {ChatMessageType} from "../ChatPage"
import {Message} from "../Message/Message"
import s from "./ChatMessages.module.scss"
import cn from "classnames"


// const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type ChatMessage = {
    wsChanel: WebSocket
}

export const ChatMessages: React.FC<ChatMessage> = ({wsChanel}) => {

    // реф для того чтобы блок со скролом всегда был в конце
    const scrollToBottom = useRef<HTMLDivElement>(null)
    const ownerId = useSelector<StateType, number | null>(state => state.auth.data.id)

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    useEffect(() => {
        scrollToBottom && scrollToBottom.current && scrollToBottom.current.scrollIntoView({behavior: "smooth"})
        // messages.length && console.log(messages[messages.length - 1].userId)
    }, [messages])

    return (
        <div className={s.allMessagesBlock}>
            {
                messages.map((m, i) =>
                    <div
                        key={i}
                        className={cn(s.message, {[s.owner]: ownerId === m.userId})}
                    >
                        <Message message={m}/>
                    </div>)
            }
            <div ref={scrollToBottom}/>
        </div>
    )
}


// export const AddChatMessageForm: React.FC = () => {
//
//     const [value, setValue] = useState<string>('')
//     const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
//
//     const sendMessage = () => {
//         if (value) {
//             wsChanel.send(value)
//             setValue('')
//         }
//     }
//
//     useEffect(() => {
//         wsChanel.addEventListener('open', () => {
//             setReadyStatus('ready')
//         })
//     }, [])
//
//     // мы можем отправить сообщение быстрее чем установиться соедениние с каналом сокета
//     // для этого нужно садизеблить кнопку до тех пор пока канал не будет открыт
//
//     return (
//         <div>
//             <div>
//                 <SNTextarea
//                     value={value}
//                     onChange={(e) => setValue(e.currentTarget.value)}
//                 ></SNTextarea>
//             </div>
//             <div>
//                 {/*дизеблим кнопку до тех пор пока канал не установлен*/}
//                 {/*<SNButton disabled={wsChanel.readyState !== WebSocket.OPEN} buttonText={'send'} onClick={sendMessage}/>*/}
//                 <SNButton disabled={readyStatus !== 'ready'} buttonText={'send'} onClick={sendMessage}/>
//             </div>
//         </div>
//     )
// }