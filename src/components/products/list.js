import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import conf from '../../conf';
import { useHistory } from 'react-router-dom';
import Paginate from '../Paginate';
import AppContext from '../../appContext';
import {
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TextField,
    Button,
} from '@material-ui/core';


const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    const [search, setSearch] = useState('');

    const limit = 5;
    let offset = 0

    const history = useHistory();

    const context = useContext(AppContext);

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
                const data = res.data;
                if (data.length === 0) {
                    context.handlerOpenSnackbar();
                    context.handlerSnackbarAlert('error', 'No se encontró el producto');
                } else {
                    setProducts(res.data)
                }

            })
            .catch(error => console.log(error));
    }

    const onChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        setSearch(e.target.value);
    };

    const getProducts = () => {
        Axios.get(`${conf.API_URL}/products`)
            .then(response => {
                setProducts(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    const eliminarButton = (id) => () => {
        Axios.delete(`${conf.API_URL}/products/${id}`)
            .then(response => {
                console.log(response);
                getProducts()
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
                    value={search} required />
                <Button type='submit'>Buscar</Button>
            </form>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripcion</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
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
                </Table>
                <Paginate
                        totalProducts={totalProducts}
                        productsPerPage={limit}
                        changePage={changePage} />
            </TableContainer>
        </div>
    )
}

export default ProductList;