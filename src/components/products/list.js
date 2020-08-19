import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import conf from '../../conf';  
import { TableContainer, TableHead, TableBody, TableCell, TableRow, Table, Link, TextField, Button } from '@material-ui/core';

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = () => {
        Axios.get(`${conf.API_URL}/products`)
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form>
                
            </form>
            <TextField placeHolder='Buscar' variant='outlined'/>
            <Button>Buscar</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Precio</TableCell>
                    </TableHead>
                    <TableBody>
                        {products.map(product => 
                        <TableRow>
                            <Link to={`products/${product.id}`}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            </Link>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductList;