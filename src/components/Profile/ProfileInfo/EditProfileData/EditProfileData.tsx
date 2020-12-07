import React, {useCallback, useEffect} from "react";
import {ProfileType, updProfile} from "../../../../store/ProfileReducer";
import {useDispatch} from "react-redux";
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
type ContactsNames = "fullName" | "lookingForAJob" | "lookingForAJobDescription" | "aboutMe" | "github"
    | "vk" | "facebook" | "instagram" | "twitter" | "website" | "youtube" | "mainLink"


const EditProfileData = React.memo((props: ProfileType & EditType) => {
    // const errorMessages = useSelector<StateType, string[]>(state => state.profile.messages)
    const dispatch = useDispatch()
    const {register, handleSubmit, setError, errors, getValues} = useForm<EditProfileDataForm>()
    const formValue = getValues()

    const currentErrorIn = useCallback((m: string, text: ContactsNames) => {
        m.toLowerCase().indexOf(text.toLowerCase()) !== -1 && setError(text, {
            message: m.slice(0, 18).toLowerCase() === 'invalid url format' ? m.slice(0, 18) + '.' : m
        })
    }, [setError])

    useEffect(() => {
        props.messages.forEach(m => {
            currentErrorIn(m, 'vk')
            currentErrorIn(m, 'facebook')
            currentErrorIn(m, 'instagram')
            currentErrorIn(m, 'twitter')
            currentErrorIn(m, 'website')
            currentErrorIn(m, 'youtube')
            currentErrorIn(m, 'mainLink')
            currentErrorIn(m, 'github')
        })
    }, [props.messages, currentErrorIn])

    const saveEdit = useCallback(({fullName, lookingForAJob, lookingForAJobDescription, aboutMe, ...data}: EditProfileDataForm) => {
        dispatch(updProfile({
            fullName: fullName,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription,
            aboutMe: aboutMe,
            contacts: {
                ...data
            }
        }))
    },[formValue, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps


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
})

export default EditProfileData