import React, {useEffect} from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "../Profile/Profile.module.scss"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, ProfileRootType} from "../../store/ProfileReducer";
import {StateType} from "../../store/store";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";


const ProfileContainer = React.memo(() => {

    const {userID} = useParams<{ userID: string }>()

    const dispatch = useDispatch()
    const profile = useSelector<StateType, ProfileRootType>(state => state.profile)
    const authUser = useSelector<StateType, number>(state => state.auth.data.id)
    const ID = userID ? userID : authUser

    useEffect(() => {
            dispatch(getProfile(ID.toString()))
    }, [ID, dispatch])

    return (
        <div className={s.profileBlock}>
            {profile.profileFetching
                ? <MiniPreloader/>
                : <><ProfileInfo {...profile}/>
                    <MyPosts/></>
            }
        </div>
    )
})

export default ProfileContainer