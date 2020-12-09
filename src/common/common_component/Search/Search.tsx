import React, {ChangeEvent} from "react";
import SNInput from "../input/SNInput";
import s from "../Search/Search.module.scss"

type SearchField = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = (props: SearchField) => {

    return (
        <div className={s.search}>
            <SNInput value={props.value} onChange={props.onChange} type={'search'} />
        </div>
    )
}

export default Search