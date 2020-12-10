import React, {ChangeEvent, useState} from "react"
import MiniPreloader from "../../common/common_component/Preloader/MiniPreloader/MiniPreloader";
import _ from "lodash"

const Settings = () => {

    const [value, setValue] = useState<string>('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        deb()
    }

    const a = () => {
        console.log('debounce')
    }
    const deb = _.debounce(a, 500)

    return (
        <div>
            <input value={value} onChange={onChange} />
            <MiniPreloader />
        </div>
    )
}

export default Settings