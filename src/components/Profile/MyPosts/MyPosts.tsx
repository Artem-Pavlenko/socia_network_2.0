import React from "react";
import s from "./MyPosts.module.scss"
import UserPost from "./Post/UserPost";

const MyPosts = () => {
    return (
        <div className={s.myPostsBlock}>
            <textarea></textarea>
            <button>add post</button>

            P O S T S :
            <UserPost text={'1'}/>
            <UserPost text={'2'}/>
            <UserPost text={'3'}/>

        </div>
    )
}

export default MyPosts