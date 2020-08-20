import React from 'react'
import { Button } from '@material-ui/core';

const Paginate = ({ productsPerPage, totalProducts, changePage }) => {

    const pages = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pages.push(i);
    }
    return (
        <nav>
            {
                pages.map(pageNumber => 
                <Button onClick={() => changePage(pageNumber)} key={pageNumber}>
                    {pageNumber}
                </Button>)
            }
        </nav>
    )
}

export default Paginate