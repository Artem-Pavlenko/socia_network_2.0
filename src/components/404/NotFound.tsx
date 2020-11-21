import React from "react";
import notFoundIcon from "../../assets/images/404.svg"
import s from "../404/NotFound.module.scss"

const NotFound = () => {

    return (
        <div className={s.notFoundBlock}>
            <img src={notFoundIcon} alt="not found"/>
            <div>
                <span>not found</span>
            </div>
        </div>
    )
}

export default NotFound