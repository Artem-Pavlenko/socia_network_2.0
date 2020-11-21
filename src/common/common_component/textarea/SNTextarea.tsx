import React, {ChangeEvent} from "react";
import s from   "../textarea/SNTextarea.module.scss"
import TextareaAutosize from 'react-textarea-autosize';

type Input = {
    value: string
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void

}

const SNTextarea = (props: Input) => {

    return (
        <div className={s.inputBlock}>
            <div>
                <TextareaAutosize className={s.textBox} value={props.value} onChange={props.onChange}
                                  placeholder={props.placeholder}/>
                {/*<textarea className={s.textBox} value={props.value} onChange={props.onChange}*/}
                {/*        placeholder={props.placeholder}></textarea>*/}
                <span className={s.focusBorder}></span>
            </div>
        </div>
    )
}

export default SNTextarea