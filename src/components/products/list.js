import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {

    return (
        <div>
            <h1>Lista de productos</h1>
            <Link to='/products/create'><button>Crear productos</button></Link>
        </div>
    )
}

export default ProductList;