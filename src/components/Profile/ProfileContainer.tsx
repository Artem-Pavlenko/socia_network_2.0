import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "../Profile/Profile.module.scss"


const ProfileContainer = React.memo(() => {

    return (
        <div className={s.profileBlock}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
})

export default ProfileContainer