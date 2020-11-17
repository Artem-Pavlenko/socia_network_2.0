import React from "react";
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "../Profile/Profile.module.scss"

type Profile = {
    posts: Array<PostType>
    addPost: (post: string) => void
}


const ProfilePage = React.memo ((props: Profile) => {

    return (
        <div className={s.profileBlock}>
            <ProfileInfo />
            <MyPosts addPost={props.addPost} posts={props.posts} />
        </div>
    )
})

export default ProfilePage