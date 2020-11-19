import React from "react";
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "../Profile/Profile.module.scss"
import {ActionsType} from "../../store/store";

type Profile = {
    posts: Array<PostType>
    dispatch: (action: ActionsType) => void
}


const ProfilePage = React.memo((props: Profile) => {

    return (
        <div className={s.profileBlock}>
            <ProfileInfo/>
            <MyPosts dispatch={props.dispatch} posts={props.posts}/>
        </div>
    )
})

export default ProfilePage