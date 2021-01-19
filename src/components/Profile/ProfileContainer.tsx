import React, {useEffect} from "react"
import {Redirect, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader"
import {getProfile, ProfileRootType} from "../../store/ProfileReducer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import s from "../Profile/Profile.module.scss"
import {StateType} from "../../store/store"
import MyPosts from "./MyPosts/MyPosts"


const ProfileContainer = React.memo(() => {

    const {userID} = useParams<{ userID: string }>()
    const dispatch = useDispatch()
    const profile = useSelector<StateType, ProfileRootType>(state => state.profile)
    const authUser = useSelector<StateType, number | null>(state => state.auth.data.id)
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)

    const ID = userID ? +userID : authUser

    useEffect(() => {
        ID && dispatch(getProfile(ID))
    }, [ID, dispatch])

    // const history = useHistory()
    // if (!ID) history.push('/login')
    if (!isAuth && !ID) return <Redirect to={'/login'}/>
    return (
        <div className={s.profileBlock}>
            {profile.profileFetching
                ? <MiniPreloader/>
                : <><ProfileInfo {...profile}/>
                    {authUser === profile.userId && <MyPosts/>}</>
            }
        </div>
    )
})

export default ProfileContainer