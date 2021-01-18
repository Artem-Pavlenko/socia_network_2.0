import React, {useEffect, useState, KeyboardEvent} from "react"
import SNTextarea from "../../../common/common_component/textarea/SNTextarea"
import SNButton from "../../../common/common_component/button/SNButton"


type AddChat = {
    wsChanel: WebSocket | null
}

export const AddChatMessageForm: React.FC<AddChat> = ({wsChanel}) => {

    const [value, setValue] = useState<string>('')
    // WebSocket status
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const sendMessage = () => {
        if (value) {
            wsChanel?.send(value)
            setValue('')
        }
    }
    const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            sendMessage()
            setValue('')
        }
    }

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        };
        wsChanel?.addEventListener('open', openHandler)
        return () => {
            wsChanel?.removeEventListener('open', openHandler)
            wsChanel?.close()
        }
    }, [wsChanel])

    // мы можем отправить сообщение быстрее чем установиться соедениние с каналом сокета
    // для этого нужно садизеблить кнопку до тех пор пока канал не будет открыт

    return (
        <div>
            <div>
                <SNTextarea
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    onKeyPress={onEnterPress}
                />
            </div>
            <div>
                <SNButton buttonText={'cancel'} disabled={!value}/>
                {/*дизеблим кнопку до тех пор пока канал не установлен*/}
                {/*<SNButton disabled={wsChanel.readyState !== WebSocket.OPEN} buttonText={'send'} onClick={sendMessage}/>*/}
                <SNButton
                    disabled={wsChanel == null || readyStatus !== 'ready'}
                    buttonText={'send'}
                    onClick={sendMessage}
                />
            </div>
        </div>
    )
}