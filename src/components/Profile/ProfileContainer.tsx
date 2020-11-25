import React, {useEffect, useState} from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "../Profile/Profile.module.scss"
import {useParams} from "react-router-dom";
import {instance} from "../../api/API";
import {useDispatch, useSelector} from "react-redux";
import {ProfileType, setProfile, setStatus} from "../../store/ProfileReducer";
import {StateType} from "../../store/store";
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";


const ProfileContainer = React.memo(() => {
    const {userID} = useParams<{userID: string}>()
    const dispatch = useDispatch()
    const profile = useSelector<StateType, ProfileType>(state => state.profile)
    const [showProfile, setShowProfile] = useState<boolean>(false)

    useEffect(() => {
        if (userID) {
            let profile = instance.get(`profile/${userID}`)
            let status = instance.get(`profile/status/${userID}`)
            Promise.all([profile, status]).then(res => {
                dispatch(setProfile(res[0].data))
                dispatch(setStatus(res[1].data))
                setShowProfile(true)
            })
        } else {
            setShowProfile(true)
        }
    }, [userID, dispatch])

    return (
        <div className={s.profileBlock}>
            {showProfile
                ? <><ProfileInfo {...profile}/>
                    <MyPosts/></>
                : <MiniPreloader/>
            }
        </div>
    )
})

export default ProfileContainer