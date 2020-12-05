import React, {useEffect} from "react";
import {ProfileType, updProfile} from "../../../../store/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../store/store";
import {useForm} from "react-hook-form";
import s from "../EditProfileData/EditProfileData.module.scss";
import SNButton from "../../../../common/common_component/button/SNButton";


type EditType = {
    cancelEdit: () => void
    messages: string[]
}
type EditProfileDataForm = {
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


    // const errorMessages = useSelector<StateType, string[]>(state => state.profile.messages)
    const dispatch = useDispatch()
    const {register, handleSubmit, setError, errors} = useForm<EditProfileDataForm>()

    // const currentError = (m: string, text: "fullName" | "lookingForAJob" | "lookingForAJobDescription" | "aboutMe" | "github" | "vk" | "facebook" | "instagram" | "twitter" | "website" | "youtube" | "mainLink") => {
    //     m.toLowerCase().indexOf(text) !== -1 && setError(text, {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
    // }

    useEffect(() => {
        props.messages.forEach(m => {
            m.toLowerCase().indexOf('vk') !== -1 && setError('vk', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
            m.toLowerCase().indexOf('facebook') !== -1 && setError('facebook', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
            m.toLowerCase().indexOf('instagram') !== -1 && setError('instagram', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
            m.toLowerCase().indexOf('twitter') !== -1 && setError('twitter', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
            m.toLowerCase().indexOf('website') !== -1 && setError('website', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
            m.toLowerCase().indexOf('youtube') !== -1 && setError('youtube', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
            m.toLowerCase().indexOf('mainlink') !== -1 && setError('mainLink', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
            m.toLowerCase().indexOf('github') !== -1 && setError('github', {message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m})
        })
    }, [props.messages, setError])

    const saveEdit = ({fullName, lookingForAJob, lookingForAJobDescription, aboutMe, ...data}: EditProfileDataForm) => {
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
                    {errors.fullName && <span>{errors.fullName.message}</span>}
                </div>
                <div className={s.item}>
                    <span>Looking for a job : </span><input type="checkbox" name='lookingForAJob' ref={register}/>
                    {errors.lookingForAJob && <span>{errors.lookingForAJob.message}</span>}
                </div>
                <div className={s.item}>
                    <span className={s.title}>Skills : </span>
                    <input type="text" name='lookingForAJobDescription' ref={register}
                           defaultValue={(props.lookingForAJobDescription as string)}/>
                    {errors.lookingForAJobDescription && <span>{errors.lookingForAJobDescription.message}</span>}
                </div>
                <div className={s.item}>
                    <span className={s.title}>About me :</span>
                    <input type="text" name='aboutMe' ref={register} defaultValue={(props.aboutMe as string)}/>
                    {errors.aboutMe && <span>{errors.aboutMe.message}</span>}
                </div>
                <div className={s.item}>
                    <b>Contacts</b>
                </div>
                {(Object.keys(props.contacts) as Array<keyof typeof props.contacts>).map(key => {
                    const defaultValue = props.contacts[key] === null ? '' : props.contacts[key]

                    return <div key={key} className={s.item}>
                        <span className={s.title}>{key} :</span>
                        <input type="text" name={key} ref={register} defaultValue={(defaultValue as string)}/>
                        {errors[key] && <span key={key} style={{color: 'red'}}>{errors[key]?.message}</span>}
                    </div>
                })}
                {/*<div className={s.errors}>*/}
                {/*    {errorMessages.map((error, i) => <div key={i} className={s.errorItem}>{error}</div>)}*/}
                {/*</div>*/}
                <div className={s.buttons}>
                    <SNButton buttonText={'save'}/>
                    <SNButton buttonText={'cancel'} onClick={props.cancelEdit}/>
                </div>
            </form>
        </div>
    )
}

export default EditProfileData