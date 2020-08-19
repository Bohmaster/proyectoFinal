import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import conf from '../../conf';
import { useHistory } from 'react-router-dom';
import { TableContainer, TableHead, TableBody, TableCell, TableRow, Table, Link, TextField, Button } from '@material-ui/core';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const history = useHistory();
    const [search, setSearch] = useState('');

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

    const handlerEdit = (id) => {
        history.push(`/products/${id}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        Axios.get(`${conf.API_URL}/products`, {
            params: {
                filter: {
                    where: {
                        name: search
                    }
                }
            }
        })
        .then(res=> {
            setProducts(res.data)
        })
    }

    const onChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        setSearch(e.target.value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField name='search' variant='outlined' onChange={onChangeHandler} value={search}/>
                <Button type='submit'>Buscar</Button>
            </form>
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
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell><Button onClick={() => handlerEdit(product.id)}>Editar</Button></TableCell>
                                <TableCell><Button>Eliminar</Button></TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductList;