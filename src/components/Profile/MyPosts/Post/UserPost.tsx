import React from "react";
import s from "./Post.module.scss"


type Post = {
    text?: string
    srcImg?: string
    likesCount: number
}

const UserPost = React.memo (({text = "", srcImg = "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg", likesCount}: Post) => {

    return (
        <div className={s.postBlock}>
            <div className={s.postDescription}>
                <img src={srcImg} alt=""/>
                <span>{text}</span>
            </div>
            <div className={s.likes}>
                <span>likes: {likesCount}</span>
            </div>
        </div>
    )
})

export default UserPost