import React from "react";
import s from "../PopUp/PopUp.module.scss"

type PropsType = {
    text?: string
}

export const PopUp = (props: PropsType) => {
    return (
        <div className={s.popUpBlock}>
            <div className={s.text}>
                {props.text}
            </div>
        </div>
    )
}