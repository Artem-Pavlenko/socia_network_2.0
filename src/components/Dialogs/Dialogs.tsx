import React from "react";
import Messages from "./Messages/Messages";
import s from "./Dialogs.module.scss"
import DialogsItems from "./DialogsItem/DialogsItems";


const Dialogs = () => {

    const users = [{id: 1, name: "Artem"}, {id: 2, name: "Dima"}, {id: 3, name: "Alex"},
        {id: 4, name: "Yarik"}, {id: 5, name: "Bob"}]
    const mess = [{id: 1, message: 'React'}, {id: 2, message: 'Redux'},
        {id: 3, message: 'Hooks'}, {id: 4, message: 'hoc'}]

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