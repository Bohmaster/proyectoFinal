import React from 'react'
import { Button, Typography, Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const Paginate = ({ productsPerPage, totalProducts, changePage }) => {

    const pages = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div>
            {
                pages.map(pageNumber =>
                    <Button onClick={() => changePage(pageNumber)} key={pageNumber}>
                        {pageNumber}
                    </Button>)
            }
        </div>
    )
}

export default Paginate