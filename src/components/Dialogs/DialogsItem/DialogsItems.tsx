import React from "react";
import {NavLink} from "react-router-dom";
import s from "../DialogsItem/DialogsItem.module.scss"


type DialogsItem = {
    id: string | number
    name: string
}

const DialogsItems = React.memo ((props: DialogsItem) => {
    return (
        <div className={s.itemBlock}>
            <NavLink activeClassName={s.active} to={"/messages/"+ props.id}>{props.name}</NavLink>
        </div>
    )
})

export default DialogsItems