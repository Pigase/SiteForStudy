import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const {game} = useContext(Context)
    const pageCount = Math.ceil(game.totalCount / game.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++)
    {
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt=3">
            {pages.map(page =>
                <Pagination.Item
                  key={page}
                  active={game.page === page}
                  onClick={() => game.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}

        </Pagination>
    )
})

export default Pages;