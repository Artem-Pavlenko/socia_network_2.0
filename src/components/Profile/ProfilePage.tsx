import React, {useEffect} from "react";
import ProfileContainer from "./ProfileContainer";
import {useDispatch} from "react-redux";
import {leavingProfilePage} from "../../store/ProfileReducer";

const ProfilePage = () => {

    // const dispatch = useDispatch()

    // useEffect( () => {
    //     return () => {
    //         dispatch(leavingProfilePage())
    //     }
    // })

    return <ProfileContainer/>
}

export default ProfilePage