import React from "react";
import s from "../button/SNButton.module.scss"

type Button = {
    onClick: () => void
    buttonText: string
}

const SNButton = (props: Button) => {

    return (
        <div className={s.btnBlock}>
            <button onClick={props.onClick}>{props.buttonText}</button>
        </div>
    )
}

export default SNButton