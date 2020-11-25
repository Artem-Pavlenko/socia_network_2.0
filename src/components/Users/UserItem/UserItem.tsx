import React, {useRef} from "react"
import s from "../UserItem/UserItem.module.scss"
import {useDispatch} from "react-redux";
import {followUnfollow, UserType} from "../../../store/UsersReducer";
import userPhoto from "../../../assets/images/anonymous.svg"
import {NavLink} from "react-router-dom";
import {instance} from "../../../api/API";
import {setFollowingFriends} from "../../../store/FriendsReducer";


const UserItem = (props: UserType) => {

    const dispatch = useDispatch()
    const btnRef = useRef<HTMLButtonElement>(null)

    const onFollowUnfollow = () => {

        // if (props.followed) {
        //     instance.delete(`follow/${props.id}`)
        //         .then(res => {
        //             console.log('unfollow result code:', res.data.resultCode)
        //             if (res.data.resultCode === 0) {
        //                 dispatch(followUnfollow(props.id, false))
        //                 dispatch(setFollowingFriends(props.id, false))
        //                 // instance.get('users?friend=true')
        //                 //     .then(res => dispatch(setFriendsTotalCount(res.data.totalCount)))
        //             }
        //         })
        // } else {
        //     instance.post(`follow/${props.id}`)
        //         .then(res => {
        //             console.log('follow result code:', res.data.resultCode)
        //             if (res.data.resultCode === 0) {
        //                 dispatch(followUnfollow(props.id, true))
        //                 dispatch(setFollowingFriends(props.id, true))
        //                 // instance.get('users?friend=true')
        //                 //     .then(res => dispatch(setFriendsTotalCount(res.data.totalCount)))
        //             }
        //         })
        // }

        (props.followed ? instance.delete : instance.post)(`follow/${props.id}`)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(followUnfollow(props.id, !props.followed))
                    dispatch(setFollowingFriends(props.id, !props.followed))
                }
            })
    }
    const onFollowUnfollowIcon = () => {
        btnRef && btnRef.current && btnRef.current.click()
    }

    return (
        <div className={`${s.userBlock} ${props.followed && s.isFollowed}`}>
            <div className={s.userInfo}>

                <div className={s.avaWithDescription}>
                    <div className={s.avatarBlock}>
                        <NavLink to={`/profile/${props.id}`}><img src={props.photos.large || userPhoto}
                                                                  alt=""/></NavLink>
                    </div>
                    <div className={s.name}>
                        <div>{props.name}</div>
                        {props.uniqueUrlName && <span>url: {props.uniqueUrlName}</span>}
                    </div>
                </div>

                <div className={s.status}>
                    <span>{props.status || '...'}</span>
                </div>

            </div>
            <div className={s.followCheck}>
                <input type="checkbox" checked={props.followed} readOnly={true}/>
            </div>
            <div className={s.button}>
                <div className={`${s.following} ${props.followed ? s.unfollow : s.follow}`}
                     onClick={onFollowUnfollowIcon}>
                    {
                        props.followed
                            ? <button ref={btnRef} onClick={onFollowUnfollow}>unfollow</button>
                            : <button ref={btnRef} onClick={onFollowUnfollow}>follow</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserItem