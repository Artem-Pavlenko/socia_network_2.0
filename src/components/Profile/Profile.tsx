import React from "react";
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "../Profile/Profile.module.scss"

type Profile = {
    posts: Array<PostType>
}


const Profile = (props: Profile) => {

    return (
        <div className={s.profileBlock}>
            <ProfileInfo />
            <MyPosts posts={props.posts} />
        </div>
    )
}

export default Profile