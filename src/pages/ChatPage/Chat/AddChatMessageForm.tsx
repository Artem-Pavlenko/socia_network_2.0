import React, {KeyboardEvent, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import SNTextarea from "../../../common/common_component/textarea/SNTextarea"
import SNButton from "../../../common/common_component/button/SNButton"
import {ChatType, sendMessage} from "../../../store/chatReducer"
import {StateType} from "../../../store/store";


export const AddChatMessageForm: React.FC = React.memo(() => {
    const {status} = useSelector<StateType, ChatType>(state => state.chat)
    const [value, setValue] = useState<string>('')
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (value.trim()) {
            dispatch(sendMessage(value))
            setValue('')
        }
    }
    const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            sendMessageHandler()
        }
    }
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
                <SNButton buttonText={'cancel'} disabled={!value} onClick={() => setValue('')}/>
                {/*дизеблим кнопку до тех пор пока канал не установлен*/}
                {/*<SNButton disabled={wsChanel.readyState !== WebSocket.OPEN} buttonText={'send'} onClick={sendMessage}/>*/}
                <SNButton
                    disabled={status !== 'ready'}
                    buttonText={'send'}
                    onClick={sendMessageHandler}
                />
            </div>
        </div>
    )
})