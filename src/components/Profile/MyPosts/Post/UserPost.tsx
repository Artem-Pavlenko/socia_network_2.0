import React from "react";
import s from "./Post.module.scss"


type Post = {
    text?: string
    srcImg?: string
    likesCount: number
}

const UserPost = ({text = "", srcImg = "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg", likesCount}: Post) => {

    return (
        <div className={s.postBlock}>
            <img src={srcImg} alt=""/>
            <div className={s.posts}>
                <div className={s.postText}>
                    <span>{text}</span>
                </div>
                <div className={s.likes}>
                    <span>likes: {likesCount}</span>
                </div>
            </div>
        </div>
    )
}

export default UserPost