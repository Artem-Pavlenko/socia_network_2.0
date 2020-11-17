import React from "react";
import Messages from "./Messages/Messages";
import s from "./Dialogs.module.scss"


const Dialogs = () => {
    return (
        <div className={s.dialogsBlock}>
            <Messages />
        </div>
    )
}

export default Dialogs