import React, {ChangeEvent, KeyboardEvent} from "react";
import s from "../input/SNInput.module.scss"

type Input = {
    value: string
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    autoFocus?: boolean
    onBlur?: () => void
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const SNInput = (props: Input) => {

    return (
        <div className={s.inputBlock}>
            <div>
                <input className={s.textBox} type="text" {...props}/>
                <span className={s.focusBorder}></span>
            </div>
        </div>
    )
}

export default SNInput