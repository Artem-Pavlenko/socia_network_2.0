import React, {useRef} from "react"
import s from "../UserItem/UserItem.module.scss"
import {useDispatch} from "react-redux";
import {followUnfollow, toggleFollowingProgress, UserType} from "../../../store/UsersReducer";
import userPhoto from "../../../assets/images/anonymous.svg"
import {NavLink} from "react-router-dom";
import {instance} from "../../../api/API";
import {setFollowingFriends, toggleFollowingFriendsProgress} from "../../../store/FriendsReducer";


const UserItem = (props: UserType & { toggleFollowingProgress: Array<number> }) => {

    const dispatch = useDispatch()
    const btnRef = useRef<HTMLButtonElement>(null)

    const onFollowUnfollow = () => {
        dispatch(toggleFollowingProgress(true, props.id));
        dispatch(toggleFollowingFriendsProgress(true, props.id));
        (props.followed ? instance.delete : instance.post)(`follow/${props.id}`)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(followUnfollow(props.id, !props.followed))
                    // этот диспатч для сраници Friends.
                    dispatch(setFollowingFriends(props.id, !props.followed))
                    dispatch(toggleFollowingProgress(false, props.id))
                    dispatch(toggleFollowingFriendsProgress(false, props.id))
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
                        <NavLink to={`/profile/${props.id}`}>
                            <img src={props.photos.large || userPhoto} alt=""/>
                        </NavLink>
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
                <div className={`${s.following} ${props.followed
                    ? s.unfollow
                    : s.follow} ${props.toggleFollowingProgress.some(id => id === props.id) && s.wait}`}
                     onClick={(props.toggleFollowingProgress.some(id => id === props.id) ? () => {
                     } : onFollowUnfollowIcon)}>
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