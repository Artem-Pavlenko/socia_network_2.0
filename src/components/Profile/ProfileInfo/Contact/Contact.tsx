import React from "react";
import {DEV_MODE} from "../../../../common/dev.mode/devMode";


type ContactType = {
    contactTitle: string
    contactValue: string | null
}

const Contact = React.memo(({contactTitle, contactValue}: ContactType) => {

    const href = contactValue?.toLowerCase().indexOf('https://') === -1 ? 'https://' + contactValue : contactValue

    DEV_MODE && console.log('Contacts render')

    if (!contactValue) return null
    return (
        <div>
            <span style={{display: 'block', margin: '5px 1px'}}>{contactTitle} : </span>
            <a href={href as string} target='_blank' rel='noreferrer'>{contactValue}</a>
        </div>
    )
})

export default Contact