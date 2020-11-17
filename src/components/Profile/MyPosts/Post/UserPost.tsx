import React from "react";
import s from "./Post.module.scss"


type Post = {
    text?: string
    srcImg?: string
}

const UserPost = ({text = "", srcImg = "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"}: Post) => {
    return (
        <div className={s.postBlock}>
            <img src={srcImg} alt=""/>
            <div className={s.postText}>
                <span>post: {text}</span>
            </div>
        </div>
    )
}

export default UserPost