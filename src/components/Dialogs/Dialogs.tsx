import React, {ChangeEvent, useState} from "react";
import Messages from "./Messages/Messages";
import s from "./Dialogs.module.scss"
import DialogsItems from "./DialogsItem/DialogsItems";
import {useDispatch, useSelector} from "react-redux";
import {MessageReducerType, sendMess} from "../../store/MessageReducer";
import {StateType} from "../../store/store";


const DialogsPage = React.memo(() => {

    const [value, setValue] = useState<string>('')
    const dispatch = useDispatch()
    const {users, message} = useSelector<StateType, MessageReducerType>(state => state.message)

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    const sendMessage = () => {
        dispatch(sendMess(value))
        setValue('')
    }

    return (
        <div className={s.dialogsBlock}>
            <div className={s.users}>
                {users.map(u => <DialogsItems key={u.id} id={u.id} name={u.name}/>)}
            </div>
            <div className={s.messBlock}>
                <h2>Messages</h2>
                <div className={s.mess}>
                    {message.map(m => <Messages key={m.id} text={m.message}/>)}
                </div>
                <div>
                    <textarea value={value} onChange={onTextAreaChange}></textarea>
                </div>
                <div className={s.sendMess}>
                    <button onClick={sendMessage}>send</button>
                </div>
            </div>
        </div>
    )
})

export default DialogsPage