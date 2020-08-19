import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import conf from '../../conf';
import { useHistory } from 'react-router-dom';
import { TableContainer, TableHead, TableBody, TableCell, TableRow, Table, Link, TextField, Button } from '@material-ui/core';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = () => {
        Axios.get(`${conf.API_URL}/products`, {
            params: {
                filter: {
                    where: {
                        name: 'pablo'
                    }
                }
            }
        })
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(error => console.log(error))
    }

    const handleEdit = (id) => {
        history.push(`/products/${id}`);
    }

    return (
        <div>

            <TextField placeholder='Buscar' variant='outlined' />
            <Button>Buscar</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {products.map(product =>
                            <TableRow>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell><Button onClick={() => handleEdit(product.id)}>Editar</Button></TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductList;