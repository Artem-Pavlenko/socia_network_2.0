import React from "react";
import {ProfileType, updProfile} from "../../../../store/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../store/store";
import {useForm} from "react-hook-form";
import s from "../EditProfileData/EditProfileData.module.scss";
import SNButton from "../../../../common/common_component/button/SNButton";


type EditType = {
    cancelEdit: () => void
}
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

const EditProfileData = (props: ProfileType & EditType) => {


    const errorMessages = useSelector<StateType, string[]>(state => state.profile.messages)
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
        <div className={s.editBlock}>
            <form onSubmit={handleSubmit(saveEdit)}>
                <div className={s.item}>
                    <span className={s.title}>Full name :</span>
                    <input type="text" name='fullName' ref={register} defaultValue={(props.fullName as string)}/>
                </div>
                <div className={s.item}>
                    <span>Looking for a job : </span><input type="checkbox" name='lookingForAJob' ref={register}/>
                </div>
                <div className={s.item}>
                    <span className={s.title}>Skills : </span>
                    <input type="text" name='lookingForAJobDescription' ref={register}
                           defaultValue={(props.lookingForAJobDescription as string)}/>
                </div>
                <div className={s.item}>
                    <span className={s.title}>About me :</span>
                    <input type="text" name='aboutMe' ref={register} defaultValue={(props.aboutMe as string)}/>
                </div>
                <div className={s.item}>
                    <b>Contacts</b>
                </div>
                {(Object.keys(props.contacts) as Array<keyof typeof props.contacts>).map(key => {
                    const defaultValue = props.contacts[key] === null ? '' : props.contacts[key]

                    return <div key={key} className={s.item}>
                        <span className={s.title}>{key} :</span>
                        <input type="text" name={key} ref={register} defaultValue={(defaultValue as string)}/>
                    </div>
                })}
                <div className={s.errors}>
                    {errorMessages.map(error => <div className={s.errorItem}>{error}</div>)}
                </div>
                <div className={s.buttons}>
                    <SNButton buttonText={'save'}/>
                    <SNButton buttonText={'cancel'} onClick={props.cancelEdit}/>
                </div>
            </form>
        </div>
    )
}

export default EditProfileData