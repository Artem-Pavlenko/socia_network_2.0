import React, {ChangeEvent, KeyboardEvent} from "react";
import SNInput from "../input/SNInput";
import s from "../Search/Search.module.scss"

type SearchField = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Search = (props: SearchField) => {

    return (
        <div className={s.search}>
            <SNInput {...props}/>
        </div>
    )
}

export default Search