import React, {ChangeEvent, useState} from "react";
import Messages from "./Messages/Messages";
import s from "./Dialogs.module.scss"
import DialogsItems from "./DialogsItem/DialogsItems";

export type UsersType = {
    id: number
    name: string
}
export type MessType = {
    id: number
    message: string
}
type Dialogs = {
    users: Array<UsersType>
    mess: Array<MessType>
}

const DialogsPage = React.memo(({users, mess}: Dialogs) => {

    const [value, setValue] = useState<string>('')

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className={s.dialogsBlock}>
            <div className={s.users}>
                {users.map(u => <DialogsItems key={u.id} id={u.id} name={u.name}/>)}
            </div>
            <div className={s.messBlock}>
                <h2>Messages</h2>
                <div className={s.mess}>
                    {mess.map(m => <Messages key={m.id} text={m.message}/>)}
                </div>
                <div>
                    <textarea value={value} onChange={onTextAreaChange}></textarea>
                </div>
                <div>
                    <button onClick={()=> {alert(value)}}>send</button>
                </div>
            </div>
        </div>
    )
})

export default DialogsPage