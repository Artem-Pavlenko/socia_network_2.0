import React from "react";
import notFound from "../../../assets/icon/not-found (1).svg"
import s from "../NotFound/NotFound.module.scss"

type PropsType = {
    text?: string
}

export const NotFound = React.memo(({text}: PropsType) => {
    return (
        <div className={s.notFoundBlock}>
            <div className={s.text}>
                <span>{text} </span>
            </div>
            <div className={s.icon}>
                <img src={notFound} alt=" "/>
            </div>
        </div>
    )
})