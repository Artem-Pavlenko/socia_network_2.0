import React, {ChangeEvent, useState} from "react";
import Messages from "./Messages/Messages";
import s from "./Dialogs.module.scss"
import DialogsItems from "./DialogsItem/DialogsItems";
import {useDispatch, useSelector} from "react-redux";
import {MessageReducerType, sendMess} from "../../store/MessageReducer";
import {StateType} from "../../store/store";
import SNButton from "../../common/common_component/button/SNButton";
import SNTextarea from "../../common/common_component/textarea/SNTextarea";
import {Redirect} from "react-router-dom";


const DialogsPage = React.memo(() => {

    const [value, setValue] = useState<string>('')
    const dispatch = useDispatch()
    const {users, message} = useSelector<StateType, MessageReducerType>(state => state.message)
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const sendMessage = () => {
        dispatch(sendMess(value))
        setValue('')
    }

    if (!isAuth) return <Redirect to={'/login'}/>

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
                    <div className={s.sendMessGroup}>
                        <div className={s.textField}>
                            <SNTextarea value={value} onChange={onTextAreaChange}/>
                        </div>
                        <div className={s.sendMess}>
                            <SNButton onClick={sendMessage} buttonText={'send'}/>
                        </div>
                    </div>
                </div>
            </div>

    )
})

export default DialogsPage