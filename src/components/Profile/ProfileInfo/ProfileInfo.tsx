import React from "react";
import s from "../ProfileInfo/ProfileInfo.module.scss"
import {ProfileRootType} from "../../../store/ProfileReducer";
import userIMG from "../../../assets/images/anonymous.svg"
import ProfileStatus from "./ProfileStatus/ProfileStatus";


const ProfileInfo = React.memo((props: ProfileRootType) => {

    return (
        <div className={s.profileInfoBlock}>
            <div className={s.descriptionBlock}>
                <div className={s.photo}>
                    <img src={props.photos.large || userIMG} alt=" "/>
                </div>
                <div className={s.name}>
                    <span>{props.fullName}</span>
                </div>
                <div className={s.status}>
                    <ProfileStatus status={props.status}/>
                </div>
            </div>
        </div>
    )
})

export default ProfileInfo