import React, {ReactNode} from "react";
import s from ".//Modal.module.scss"
import SNButton from "../button/SNButton";

type PropsType = {
    children?: ReactNode
    title: string
    onCancel: () => void
    onSubmit: () => void
}

export const Modal = (props: PropsType) => {

    return (
        <div className={s.modalOverlay} onClick={props.onCancel}>
            <div className={s.modalWindow}>
                <div className={s.modalHeader}>
                    <div className={s.title}>{props.title}</div>
                </div>
                <div className={s.modalBody}>
                    {props.children}
                </div>
                <div className={s.modalFooter}>
                    <SNButton buttonText={'cancel'} onClick={props.onCancel}/>
                    <SNButton buttonText={'submit'} onClick={props.onSubmit}/>
                </div>
            </div>
        </div>
    )
}