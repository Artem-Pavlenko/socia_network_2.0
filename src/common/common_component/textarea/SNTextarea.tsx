import React, {ChangeEvent} from "react";
import s from "../textarea/SNTextarea.module.scss"
import TextareaAutosize from 'react-textarea-autosize';

type TextareaProps = {
    value: string
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
    autoFocus?: boolean
}

const SNTextarea = (props: TextareaProps) => {

    return (
        <div className={s.inputBlock}>
            <div>
                <TextareaAutosize className={s.textBox} value={props.value} onChange={props.onChange}
                                  placeholder={props.placeholder} autoFocus={props.autoFocus}/>
                <span className={s.focusBorder}></span>
            </div>
        </div>
    )
}

export default SNTextarea