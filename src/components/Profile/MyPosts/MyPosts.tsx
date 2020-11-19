import React, {ChangeEvent, useState} from "react";
import s from "./MyPosts.module.scss"
import UserPost from "./Post/UserPost";
import {ActionsType, addPost} from "../../../store/store";

export type PostType = {
    id: string
    post: string
    likesCount: number
}
type MyPost = {
    posts: Array<PostType>
    dispatch: (action: ActionsType) => void
}

const MyPosts = React.memo(({posts, ...props}: MyPost) => {

    const [value, setValue] = useState<string>('')

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    const addPostHandler = () => {
        props.dispatch(addPost(value))
        setValue('')
    }

    return (
        <div className={s.myPostsBlock}>
            <div className={s.addPostBlock}>
                <div>
                    <textarea placeholder={'write your post'} value={value} onChange={onTextAreaChange}></textarea>
                </div>
                <div>
                    <button onClick={addPostHandler}>add post</button>
                </div>
            </div>
            <h3>P O S T S :</h3>
            <div className={s.postGroup}>
                {posts.map(p => <UserPost key={p.id} text={p.post} likesCount={p.likesCount}/>)}
            </div>
        </div>
    )
})

export default MyPosts