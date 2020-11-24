import React from "react";
import s from "../MiniPreloader/MiniPreloader.module.scss"


const MiniPreloader = () => {
    return (
        <div className={s.preloaderBlock}>
            <div className={s.loader}></div>
        </div>
    )
}

export default MiniPreloader