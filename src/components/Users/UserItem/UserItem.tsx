import React from "react"
import s from "../UserItem/UserItem.module.scss"
import {useDispatch} from "react-redux";
import {followUnfollow} from "../../../store/UsersReducer";


type UserItem = {
    id: string
    followed: boolean
    fullName: string
    status: string
    location?: {
        city: string
        country: string
    }
}

const UserItem = (props: UserItem) => {

    const dispatch = useDispatch()

    const onFollowUnfollow = () => {
        dispatch(followUnfollow(props.id))
    }

    return (
        <div className={s.userBlock}>
            <div>
                <span>name: {props.fullName}</span>
            </div>
            <div>
                <span>status: {props.status}</span>
            </div>
            <div>
                followed: <input type="checkbox" checked={props.followed} />
            </div>
            <div>
                {props.followed ? <button onClick={onFollowUnfollow}>unfollow</button> : <button onClick={onFollowUnfollow}>follow</button> }
            </div>
        </div>
    )
}

export default UserItem