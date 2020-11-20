import React from "react";
import s from "../ProfileInfo/ProfileInfo.module.scss"


const ProfileInfo = React.memo(() => {

    return (
        <div className={s.profileInfoBlock}>
            ava + description
        </div>
    )
})

export default ProfileInfo