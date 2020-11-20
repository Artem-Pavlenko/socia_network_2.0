import React, {useRef} from "react"
import s from "../UserItem/UserItem.module.scss"
import {useDispatch} from "react-redux";
import {followUnfollow, UserType} from "../../../store/UsersReducer";
import userPhoto from "../../../assets/images/anonymous.svg"
import followIcon from "../../../assets/images/FOLLOW.svg"
import unfollowIcon from "../../../assets/images/UNFOLLOW.svg"


type UserItem = {
    followed: boolean
    id: number
    name: string
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    uniqueUrlName: string | null
}

const UserItem = (props: UserType) => {

    const dispatch = useDispatch()
    const btnRef = useRef<HTMLButtonElement>(null)

    const onFollowUnfollow = () => {
        dispatch(followUnfollow(props.id))
    }
    const onFollowUnfollowIcon = () => {
        btnRef && btnRef.current && btnRef.current.click()
    }

    return (
        <div className={`${s.userBlock} ${props.followed ? s.isFollowed : ''}`}>
            <div className={s.userInfo}>

                <div className={s.avaWithDescription}>
                    <div className={s.avatarBlock}>
                        <img src={props.photos.small ? props.photos.small : userPhoto} alt=""/>
                    </div>
                    <div className={s.name}>
                        <div>{props.name}</div>
                        {props.uniqueUrlName && <span>url: {props.uniqueUrlName}</span>}
                    </div>
                </div>

                <div className={s.status}>
                    <span>{props.status ? props.status : '---'}</span>
                </div>

            </div>
            <div className={s.followCheck}>
                <input type="checkbox" checked={props.followed} readOnly={true}/>
            </div>
            <div className={s.button}>
                <div className={`${s.following} ${props.followed ? s.unfollow : s.follow}`}
                     onClick={onFollowUnfollowIcon}>
                    {props.followed ? <button ref={btnRef} onClick={onFollowUnfollow}>unfollow</button> :
                        <button ref={btnRef} onClick={onFollowUnfollow}>follow</button>}
                </div>

            </div>
        </div>
    )
}

export default UserItem