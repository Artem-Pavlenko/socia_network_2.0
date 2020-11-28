import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updStatus} from "../../../../store/ProfileReducer";
import SNInput from "../../../../common/common_component/input/SNInput";
import {StateType} from "../../../../store/store";


const ProfileStatus = ({status}: { status: string | null }) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(status ? status : '')
    const authUserID = useSelector<StateType, number>(state => state.auth.data.id)
    const profileID = useSelector<StateType, number>(state => state.profile.userId)
    const dispatch = useDispatch()


    const changeEditMode = () => {
        authUserID === profileID && setEditMode(true)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const saveStatus = () => {
        if (value && value !== status) {
            dispatch(updStatus(value))
            setEditMode(false)
        } else if (!value || value === status) {
            setEditMode(false)
            setValue(status || '')
        }
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            saveStatus()
        }
    }

    return (
        <div>
            {editMode
                ? <div>
                    <SNInput
                        value={value}
                        onChange={onInputChange}
                        autoFocus={true}
                        onBlur={saveStatus}
                        onKeyPress={onEnter}/>
                    <button onClick={saveStatus}>save</button>
                </div>
                :
                <span style={{cursor: authUserID === profileID ? "pointer" : "default"}} onDoubleClick={changeEditMode}
                      title={authUserID === profileID ? 'Double click to edit' : 'status'}>{status || '...'}</span>
            }
        </div>
    )
}

export default ProfileStatus