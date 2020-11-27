import React, {ChangeEvent, useState} from "react";
import s from "../ProfileInfo/ProfileInfo.module.scss"
import {updStatus, ProfileRootType} from "../../../store/ProfileReducer";
import userIMG from "../../../assets/images/anonymous.svg"
import SNInput from "../../../common/common_component/input/SNInput";
import {useDispatch} from "react-redux";


const ProfileInfo = React.memo((props: ProfileRootType) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(props.status ? props.status : '')
    const dispatch = useDispatch()

    const changeEditMode = () => {
        setEditMode(true)
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const saveStatus = () => {
        dispatch(updStatus(value))
        setEditMode(false)
    }

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
                    {editMode
                        ? <div>
                            <SNInput value={value} onChange={onInputChange} autoFocus={true}/>
                            <button onClick={saveStatus}>save</button>
                        </div>
                        : <span style={{cursor: "pointer"}} onDoubleClick={changeEditMode}>{props.status || '...'}</span>
                    }
                </div>
            </div>
        </div>
    )
})

export default ProfileInfo