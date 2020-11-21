import React, {ChangeEvent, useState} from "react";
import s from "./MyPosts.module.scss"
import UserPost from "./Post/UserPost";
import {useDispatch, useSelector} from "react-redux";
import {addPost, PostType} from "../../../store/PostReducer";
import {StateType} from "../../../store/store";
import SNButton from "../../../common/common_component/button/SNButton";


const MyPosts = React.memo(() => {

    const [value, setValue] = useState<string>('')
    const posts = useSelector<StateType, PostType>(state => state.post.posts)
    const dispatch = useDispatch()

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    const addPostHandler = () => {
        dispatch(addPost(value))
        setValue('')
    }

    return (
        <div className={s.myPostsBlock}>
            <div className={s.addPostBlock}>
                <div className={s.postText}>
                    <textarea placeholder={'write your post'} value={value} onChange={onTextAreaChange}></textarea>
                </div>
                <div className={s.postSend}>
                    {/*<button onClick={addPostHandler}>add post</button>*/}
                    <SNButton onClick={addPostHandler} buttonText={'add post'} />
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