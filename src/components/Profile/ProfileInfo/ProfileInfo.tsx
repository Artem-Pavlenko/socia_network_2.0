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



const ProfileInfo = React.memo((props: ProfileRootType) => {

    const {userID} = useParams<{ userID: string }>()
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const photoRef = useRef<HTMLInputElement>(null)
    const [editMode, setEditMode] = useState<boolean>(true)

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


const ProfileData = (props: ProfileType) => {
    return (
        <div>
            <div className={s.aboutMe}>
                <span>{props.aboutMe}</span>
            </div>
            <div className={s.lookingJob}>
                <div>
                    {props.lookingForAJob && <span>I'm looking for a job.</span>}
                </div>
                <div>
                    {props.lookingForAJobDescription && <span>Skills: {props.lookingForAJobDescription}</span>}
                </div>
            </div>
            <div className={s.contacts}>
                <h3>Contacts</h3>
                {(Object.keys(props.contacts) as Array<keyof typeof props.contacts>).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.contacts[key]}/>
                })}
            </div>
        </div>
    )
}

const EditProfileData = (props: ProfileType) => {

    type EditProfileData = {
        aboutMe: string
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }

    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm<EditProfileData>()

    const saveEdit = ({fullName, lookingForAJob, lookingForAJobDescription, aboutMe, ...data}: EditProfileData) => {
        dispatch(updProfile({
            fullName: fullName,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription,
            aboutMe: aboutMe,
            contacts: {
                ...data
            }
        }))
    }


    return (
        <div>
            <form onSubmit={handleSubmit(saveEdit)}>
                <div>
                    <input type="text" name='fullName' ref={register} defaultValue={(props.fullName as string)}/>
                </div>
                <div>
                    <input type="checkbox" name='lookingForAJob' ref={register}/>
                </div>
                <div>
                    <input type="text" name='lookingForAJobDescription' ref={register}
                           defaultValue={(props.lookingForAJobDescription as string)}/>
                </div>
                <div>
                    <input type="text" name='aboutMe' ref={register} defaultValue={(props.aboutMe as string)}/>
                </div>
                {(Object.keys(props.contacts) as Array<keyof typeof props.contacts>).map(key => {
                    const defaultValue = props.contacts[key] === null ? '' : props.contacts[key]

                    return <div key={key}>
                        <div>
                            <span>{key} :</span>
                        </div>
                        <input type="text" name={key} ref={register} defaultValue={(defaultValue as string)}/>
                    </div>
                })}
                <SNButton buttonText={'send'}/>
            </form>
        </div>
    )


}