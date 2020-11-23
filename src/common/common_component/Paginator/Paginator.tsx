import React from "react";
import s from "../Paginator/Paginator.module.scss";
import cn from "classnames";


type PaginatorProps = {
    pageSize: number
    currentPage: number
    totalUsersCont: number
    onClick: (page: number) => void
}

const Paginator = ({pageSize, currentPage, totalUsersCont, onClick}: PaginatorProps) => {

    const totalPagesCount = Math.ceil(totalUsersCont / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= totalPagesCount / 50; i++) {  //делю на 50 для удобства просмотра
        pages.push(i)
    }

    return (
        <div className={s.paginatorBlock}>
            {pages.map(page => <span
                key={page}
                onClick={() => onClick(page)}
                className={cn(s.pageNumber, {[s.selectedPage]: currentPage === page})}
            >{page}</span>)}
        </div>
    )
}

export default Paginator