import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "../Profile/Profile.module.scss"



const ProfilePage = React.memo(() => {

    return (
        <div className={s.profileBlock}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
})

export default ProfilePage