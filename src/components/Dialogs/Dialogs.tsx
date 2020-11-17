import React from "react";
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

const Dialogs = ({users, mess}: Dialogs) => {


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
            </div>
        </div>
    )
}

export default Dialogs