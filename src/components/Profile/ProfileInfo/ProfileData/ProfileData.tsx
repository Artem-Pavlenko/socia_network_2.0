import React, {useState} from "react";
import {ProfileType} from "../../../../store/ProfileReducer";
import s from "../ProfileData/ProfileData.module.scss";
import Contact from "../Contact/Contact";
import SNButton from "../../../../common/common_component/button/SNButton";

const ProfileData = React.memo((props: ProfileType) => {

    const [showContacts, setShowContacts] = useState<{ show: boolean, text: 'show contacts' | 'hide contacts' }>({
        show: false, text: "show contacts"
    })

    // для отображения контактов, если они есть.
    const contacts = Object.values(props.contacts).filter(v => v !== null)

    const showHideContacts = () => {
        switch (showContacts.text) {
            case "hide contacts":
                setShowContacts({show: false, text: "show contacts"})
                break
            case "show contacts":
                setShowContacts({show: true, text: "hide contacts"})
                break
        }
    }

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
                {contacts.length !== 0 && <SNButton buttonText={showContacts.text} onClick={showHideContacts}/>}
                {showContacts.show && <>
                    <h3>Contacts</h3>
                    {(Object.keys(props.contacts) as Array<keyof typeof props.contacts>).map(key => {
                        return <Contact key={key} contactTitle={key[0].toUpperCase() + key.slice(1)}
                                        contactValue={props.contacts[key]}/>
                    })}
                </>}
            </div>
        </div>
    )
})

export default ProfileData