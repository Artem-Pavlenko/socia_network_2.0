import React from "react";
import s from "./MyPosts.module.scss"
import UserPost from "./Post/UserPost";

export type PostType = {
    id: number
    post: string
    likesCount: number
}

type MyPost = {
    posts: Array<PostType>
}

const MyPosts = ({posts}: MyPost) => {

    return (
        <div className={s.myPostsBlock}>
            <div className={s.addPostBlock}>
                <div>
                    <textarea placeholder={'write your post'}></textarea>
                </div>
                <div>
                    <button>add post</button>
                </div>
            </div>
            <h3>P O S T S :</h3>
            <div className={s.postGroup}>
                {posts.map(p => <UserPost key={p.id} text={p.post} likesCount={p.likesCount}/>)}
            </div>
        </div>
    )
}

export default MyPosts