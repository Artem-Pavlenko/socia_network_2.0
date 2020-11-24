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

    // надо зафиксить пагинатор!
    // переменная pageCount для отображения пагинатора на странице пользователей
    // totalUsersCont в Friends меньше 50 и когда делю на 50, не отображаються страници

    const pageCount = totalPagesCount > 1000 ? totalPagesCount / 50 : totalPagesCount

    const pages: number[] = []
    for (let i = 1; i <= pageCount ; i++) {  //делю на 50 для удобства просмотра
        pages.push(i)
    }
    console.log('totalUsersCont:', totalUsersCont)
    console.log('pageSize:', pageSize)
    console.log('pages:', pages)

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