import React, {ChangeEvent, KeyboardEvent} from "react";
import s from "../input/SNInput.module.scss"

type Input = {
    value?: string
    type?: string
    placeholder?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    autoFocus?: boolean
    onBlur?: () => void
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
    errors?: string | null
}

const SNInput = ({type = 'text', ...props}: Input) => {

    return (
        <div className={`${s.inputBlock } ${props.errors && s.error}`}>
            <div>
                <input className={s.textBox} type={type} {...props}/>
                <span className={s.focusBorder}></span>
            </div>
        </div>
    )
}

export default SNInput