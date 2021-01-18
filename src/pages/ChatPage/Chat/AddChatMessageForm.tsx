import React, {useEffect, useState} from "react"
import SNTextarea from "../../../common/common_component/textarea/SNTextarea"
import SNButton from "../../../common/common_component/button/SNButton"


type AddChat = {
    wsChanel: WebSocket
}

export const AddChatMessageForm: React.FC<AddChat> = ({wsChanel}) => {

    const [value, setValue] = useState<string>('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const sendMessage = () => {
        if (value) {
            wsChanel.send(value)
            setValue('')
        }
    }

    useEffect(() => {
        wsChanel.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    }, [])

    // мы можем отправить сообщение быстрее чем установиться соедениние с каналом сокета
    // для этого нужно садизеблить кнопку до тех пор пока канал не будет открыт

    return (
        <div>
            <div>
                <SNTextarea
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                ></SNTextarea>
            </div>
            <div>
                {/*дизеблим кнопку до тех пор пока канал не установлен*/}
                {/*<SNButton disabled={wsChanel.readyState !== WebSocket.OPEN} buttonText={'send'} onClick={sendMessage}/>*/}
                <SNButton disabled={readyStatus !== 'ready'} buttonText={'send'} onClick={sendMessage}/>
            </div>
        </div>
    )
}