import React, {useState} from "react";
import s from "../Paginator/Paginator.module.scss";
import cn from "classnames";


type PaginatorProps = {
    pageSize: number
    currentPage: number
    totalUsersCont: number
    onClick: (page: number) => void
    portionSize?: number
}

const Paginator = ({pageSize, currentPage, totalUsersCont, onClick, portionSize = 10}: PaginatorProps) => {

    const [portionNumber, setPortionNumber] = useState<number>(1)

    const totalPagesCount = Math.ceil(totalUsersCont / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(totalPagesCount / portionSize)
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionNumber = portionNumber * portionSize

    return (
        <div className={s.paginatorBlock}>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>{'<'}</button>}
            {pages
                .filter(page => page >= leftPortionNumber && page <= rightPortionNumber)
                .map(page => <span
                    key={page}
                    onClick={() => onClick(page)}
                    className={cn(s.pageNumber, {[s.selectedPage]: currentPage === page})}
                >{page}</span>)}
            {portionNumber < portionCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>{'>'}</button>}
        </div>
    )
}

export default Paginator