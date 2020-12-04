import React from "react";

type ContactType = {
    contactTitle: string
    contactValue: string | null
}

const Contact = ({contactTitle, contactValue}: ContactType) => {

    if (!contactValue) return <></>
    return (
        <div>
            <span>{contactTitle} : <a href={contactValue} target='_blank' rel="noreferrer">{contactValue}</a></span>
        </div>
    )
}

export default Contact