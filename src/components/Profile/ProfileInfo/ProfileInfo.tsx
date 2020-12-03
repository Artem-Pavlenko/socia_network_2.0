import React, {ChangeEvent, useRef, useState} from "react";
import s from "../ProfileInfo/ProfileInfo.module.scss"
import {ProfileRootType, ProfileType, updPhoto, updProfile} from "../../../store/ProfileReducer";
import userIMG from "../../../assets/icon/anonymous.svg"
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/store";
import SNButton from "../../../common/common_component/button/SNButton";
import {useForm} from "react-hook-form";
import editIcon from "../../../assets/icon/edit.svg"
import Contact from "./Contact";
import EditProfileData from "./EditProfileData/EditProfileData";
import ProfileData from "./ProfileData/ProfileData";


const ProfileInfo = React.memo((props: ProfileRootType) => {

    const {userID} = useParams<{ userID: string }>()
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const photoRef = useRef<HTMLInputElement>(null)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onSelectedPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            dispatch(updPhoto(e.currentTarget.files[0]))
        }
    }
    const choosePhoto = () => {
        photoRef && photoRef.current && photoRef.current.click()
    }
    const editModeTrigger = () => {
        editMode && setEditMode(false)
        !editMode && setEditMode(true)
    }

    // исправить кнопку изменения фото.


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
                <img src={editIcon} alt=" " onClick={editModeTrigger}/>
                {editMode
                    ? <EditProfileData {...props} />
                    : <ProfileData {...props}/>
                }
            </div>
        </div>
    )
})

export default ProfileInfo




