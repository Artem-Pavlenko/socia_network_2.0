import React, {useMemo, useState} from "react";
import {ProfileType} from "../../../../store/ProfileReducer";
import s from "../ProfileData/ProfileData.module.scss";
import Contact from "../Contact/Contact";
import SNButton from "../../../../common/common_component/button/SNButton";
import {DEV_MODE} from "../../../../common/dev.mode/devMode";

const ProfileData = React.memo((props: ProfileType) => {

    const [showContacts, setShowContacts] = useState<{ show: boolean, text: 'show contacts' | 'hide contacts' }>({
        show: false, text: "show contacts"
    })

    const contacts = useMemo(() => {
        return Object.values(props.contacts).filter(value => value !== null) // для отображения контактов, если они есть.
    }, [props.contacts])

    const filteredContacts = useMemo(() => {
        return (Object.entries(props.contacts) as Array<Array<string>>).filter(v => v[1] !== '').map(c => c[0])
    }, [props.contacts])

    const contactsMemo = useMemo(() => {
        return (filteredContacts as Array<keyof typeof props.contacts>).map(contact => {
            return <Contact key={contact} contactTitle={contact[0].toUpperCase() + contact.slice(1)}
                            contactValue={props.contacts[contact]}/>
        })
    }, [props, filteredContacts])

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

    DEV_MODE && console.log('ProfileData render')

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
                    {/*{(filteredContacts as Array<keyof typeof props.contacts>).map(contact => {*/}
                    {/*    return <Contact key={contact} contactTitle={contact[0].toUpperCase() + contact.slice(1)}*/}
                    {/*                    contactValue={props.contacts[contact]}/>*/}
                    {/*})}*/}
                    {contactsMemo}
                </>}
            </div>
        </div>
    )
})

export default ProfileData