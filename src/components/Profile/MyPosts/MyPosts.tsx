import React from "react";
import s from "./MyPosts.module.scss"
import UserPost from "./Post/UserPost";


const MyPosts = () => {

    const posts = [
        {id: 1, post: 'react', likesCount: 33},
        {id: 2, post: 'Redux', likesCount: 25},
        {id: 3, post: 'Thunk', likesCount: 22},
        {id: 4, post: 'Hooks', likesCount: 19},
        {id: 5, post: 'text text text text text text text text text text text text text text', likesCount: 11},
        {id: 6, post: 'text text text text text text text text text text text text text text', likesCount: 5},
        {id: 7, post: 'text text text text text text text text text text text text text text', likesCount: 1}
    ]

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