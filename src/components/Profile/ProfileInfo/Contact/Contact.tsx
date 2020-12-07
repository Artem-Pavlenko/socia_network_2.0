import React from "react";

type ContactType = {
    contactTitle: string
    contactValue: string | null
}

const Contact = ({contactTitle, contactValue}: ContactType) => {

    if (!contactValue) return <></>
    return (
        <div>
            <span style={{display: 'block', margin: '5px 1px'}}>{contactTitle} : </span>
            <a href={contactValue} target='_blank' rel="noreferrer">{contactValue}</a>
        </div>
    )
}

export default Contact