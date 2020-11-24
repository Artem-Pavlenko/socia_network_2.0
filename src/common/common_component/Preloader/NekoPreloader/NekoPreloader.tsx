import React from "react";
import s from "../NekoPreloader/NekoPreloader.module.scss"

const NekoPreloader = () => {
    return (
        <div className={s.cssload_container}>
            <div className={s.cssload_speeding_wheel}></div>
        </div>
    )
}

export default NekoPreloader