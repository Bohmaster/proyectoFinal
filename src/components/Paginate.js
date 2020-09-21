import React from 'react'
import { Button } from '@material-ui/core';

const Paginate = ({ productsPerPage, totalProducts, changePage }) => {

    const pages = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pages.push(i);
    }
    return (
        <div>
            {
                pages.map(pageNumber =>
                    <Button 
                        onClick={() => changePage(pageNumber)} 
                        key={pageNumber} 
                        variant="outlined"
                        >
                        {pageNumber}
                    </Button>)
            }
        </div>
    )
}

export default Paginate