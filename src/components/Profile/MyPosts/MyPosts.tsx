import React from "react";
import s from "./MyPosts.module.scss"
import UserPost from "./Post/UserPost";

const MyPosts = () => {
    return (
        <div className={s.myPostsBlock}>
            <div className={s.addPostBlock}>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>add post</button>
                </div>
            </div>
            <h3>P O S T S :</h3>
            <div className={s.postGroup}><UserPost text={'1'}/>
                <UserPost text={'2'}/>
                <UserPost text={'3'}/></div>
        </div>
    )
}

export default MyPosts