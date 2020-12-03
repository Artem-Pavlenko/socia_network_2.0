import React, {useRef} from "react"
import s from "../UserItem/UserItem.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {usersFollow, usersUnfollow, UserType} from "../../../store/UsersReducer";
import userPhoto from "../../../assets/icon/anonymous.svg"
import {NavLink} from "react-router-dom";
import {friendFollowing, friendUnfollow} from "../../../store/FriendsReducer";
import {StateType} from "../../../store/store";

type Extra = {
    //
    toggleFollowingProgress: Array<number>
    mode: 'friends' | 'users'
}

const UserItem = (props: UserType & Extra) => {

    const dispatch = useDispatch()
    const btnRef = useRef<HTMLButtonElement>(null)
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)

    const onFollowUnfollow = () => {
        switch (props.mode) {
            case "friends":
                props.followed ? dispatch(friendUnfollow(props.id)) : dispatch(friendFollowing(props.id))
                break
            case "users":
                props.followed ? dispatch(usersUnfollow(props.id)) : dispatch(usersFollow(props.id))
                break
        }
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
            {isAuth && <>
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
            </>}
        </div>
    )
}

export default UserItem