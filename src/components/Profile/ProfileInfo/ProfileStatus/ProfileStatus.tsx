import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {updStatus} from "../../../../store/ProfileReducer";
import SNInput from "../../../../common/common_component/input/SNInput";


const ProfileStatus = ({status}: { status: string | null }) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(status ? status : '')
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
        <div>
            {editMode
                ? <div>
                    <SNInput value={value} onChange={onInputChange} autoFocus={true}/>
                    <button onClick={saveStatus}>save</button>
                </div>
                : <span style={{cursor: "pointer"}} onDoubleClick={changeEditMode}
                        title={'Double click to edit'}>{status || '...'}</span>
            }
        </div>
    )
}

export default ProfileStatus