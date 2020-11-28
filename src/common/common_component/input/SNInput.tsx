import React, {ChangeEvent} from "react";
import s from "../input/SNInput.module.scss"

type Input = {
    value: string
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    autoFocus?: boolean
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