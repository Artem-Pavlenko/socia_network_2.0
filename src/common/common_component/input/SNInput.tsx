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
                <input className={s.textBox} type="text" value={props.value} onChange={props.onChange}
                        placeholder={props.placeholder} autoFocus={props.autoFocus}/>
                <span className={s.focusBorder}></span>
            </div>
        </div>
    )
}

export default SNInput