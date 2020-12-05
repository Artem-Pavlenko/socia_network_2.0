import React from "react";
import {ProfileType} from "../../../../store/ProfileReducer";
import s from "../ProfileData/ProfileData.module.scss";
import Contact from "../Contact/Contact";

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
                    return <Contact key={key} contactTitle={key[0].toUpperCase() + key.slice(1)} contactValue={props.contacts[key]}/>
                })}
            </div>
        </div>
    )
}

export default ProfileData