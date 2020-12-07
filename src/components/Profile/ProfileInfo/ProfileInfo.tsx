import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import s from "../ProfileInfo/ProfileInfo.module.scss"
import {clearErrors, ProfileRootType, updPhoto} from "../../../store/ProfileReducer";
import userIMG from "../../../assets/icon/anonymous.svg"
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/store";
import SNButton from "../../../common/common_component/button/SNButton";
import EditProfileData from "./EditProfileData/EditProfileData";
import ProfileData from "./ProfileData/ProfileData";
import {DEV_MODE} from "../../../common/dev.mode/devMode";


const ProfileInfo = React.memo((props: ProfileRootType) => {

    const {userID} = useParams<{ userID: string }>()
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const photoRef = useRef<HTMLInputElement>(null)
    const [editMode, setEditMode] = useState<boolean>(false)

    
    
    const onSelectedPhoto = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            dispatch(updPhoto(e.currentTarget.files[0]))
        }
    },[dispatch])
    
    const choosePhoto = useCallback(() => {
        photoRef && photoRef.current && photoRef.current.click()
    },[photoRef])
    
    const editModeTrigger =  useCallback(() => {
        editMode && setEditMode(false)
        !editMode && setEditMode(true)
        dispatch(clearErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    
    const cancelEdit = useCallback(() => {
        dispatch(clearErrors())
        setEditMode(false)
    },[dispatch])

    // исправить кнопку изменения фото.

    DEV_MODE && console.log('ProfileInfo')
    
    return (
        <div className={s.profileInfoBlock}>
            <div className={s.profileBlock}>
                <div className={s.photo}>
                    <img src={props.photos.large || userIMG} alt=" "/>
                    <div className={s.btn}>
                        {!userID && isAuth && <SNButton buttonText={'choose photo'} onClick={choosePhoto}/>}
                    </div>
                    {!userID && isAuth &&
                    <input style={{display: "none"}} ref={photoRef} type='file' onChange={onSelectedPhoto}/>}
                </div>
                <div className={s.name}>
                    <span>{props.fullName}</span>
                </div>
                <div className={s.status}>
                    <ProfileStatus status={props.status}/>
                </div>
            </div>
            <div className={s.descriptionBlock}>
                <div className={s.profileData}>{editMode
                    ? <EditProfileData {...props} cancelEdit={cancelEdit}/>
                    : <ProfileData {...props} />}
                </div>
                {!userID && isAuth && <div className={s.imgEdit} onClick={editModeTrigger}></div>}
            </div>
        </div>
    )
})

export default ProfileInfo




