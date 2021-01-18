import React from "react"
import s from "../button/SNButton.module.scss"
import cn from "classnames"

type Button = {
    onClick?: () => void
    buttonText: string
    disabled?: boolean
}

const SNButton = (props: Button) => {

    return (
        <div className={cn(s.btnBlock, {[s.disabledBtn]: props.disabled})}>
            <button disabled={props.disabled} onClick={props.onClick}>{props.buttonText}</button>
        </div>
    )
}

export default SNButton