import React, {ChangeEvent} from "react";
import SNInput from "../../../common/common_component/input/SNInput";
import s from "../Search/Search.module.scss"

type SearchField = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = (props: SearchField) => {

    return (
        <div className={s.search}>
            <SNInput value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default Search