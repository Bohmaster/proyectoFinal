import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import conf from '../../conf';
import { useHistory } from 'react-router-dom';
import Paginate from '../Paginate';
import {
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TextField,
    Button,
    TableFooter,
} from '@material-ui/core';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const [search, setSearch] = useState('');

    const limit = 5;
    let offset = 0

    const history = useHistory();

    useEffect(() => {
        fetchProducts(1);
        countProducts();
    }, [])

    const fetchProducts = (page) => {
        if (page === 1) {
            offset = 0;
        } else {
            offset = (page - 1) * limit;
        }
        Axios.get(`${conf.API_URL}/products?filter={"limit": ${limit}, "offset": ${offset}}`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(error => console.log(error))
    }

    const countProducts = () => {
        Axios.get(`${conf.API_URL}/products/count`)
            .then(res => {
                setTotalProducts(res.data.count)
            })
    }

    const changePage = (page) => {
        fetchProducts(page);
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
            .then(res => {
                setProducts(res.data);
            })
            .catch(error => console.log(error));
    }

    const onChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        setSearch(e.target.value);
    };

    const eliminarButton = (id) => () => {
        Axios.delete(`${conf.API_URL}/products/${id}`)
            .then(response => {
                console.log(response);
                fetchProducts()
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField 
                    name='search' 
                    variant='outlined' 
                    onChange={onChangeHandler} 
                    value={search} required/>
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
                                <TableCell><Button onClick={eliminarButton(product.id)}>Eliminar</Button></TableCell>
                            </TableRow>)}
                    </TableBody>
                    <TableFooter>
                        <Paginate
                            totalProducts={totalProducts}
                            productsPerPage={limit}
                            changePage={changePage} />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductList;