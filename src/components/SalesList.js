import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import conf from '../conf';
import moment from 'moment';

const styles = {
    title: {
        fontWeight: "bold",
        letterSpacing: 3
    },
}

export default function Sales() {

    const [registro, setRegistro] = useState('');
    const [product, setProduct] = useState('');
    const [totalProducts, setTotalProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({
        status: false,
        name: '',
        price: 0,
        quantity: 1
    })
    const [open, setOpen] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);

    const handleChange = (event) => {
        setRegistro(event.target.value);
    };

    const handleChangeProducts = (event) => {
        setProduct(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        Axios.get(`${conf.API_URL}/products`)
            .then(res => {
                setTotalProducts(res.data);
            })
    }, [])

    const productData = (name, price) => {
        setSelectedProduct({
            ...selectedProduct,
            status: true,
            name,
            price,
        })
        setTotalIncome(totalIncome + price)
    }

    let newArray = []

    const addQuantity = () => {
        setSelectedProduct({
            ...selectedProduct,
            quantity: selectedProduct.quantity + 1
        });
        setTotalIncome(totalIncome + selectedProduct.price);
        newArray.push(selectedProduct);
    }

    const substractQuantity = () => {
        setSelectedProduct({
            ...selectedProduct,
            quantity: selectedProduct.quantity - 1
        });
        setTotalIncome(totalIncome - selectedProduct.price);
    }

    const showProducts = () => {
        setSelectedProduct({
            ...selectedProduct,
            price: selectedProduct.price * selectedProduct.quantity,
        })
    }

    console.log(selectedProduct)

    return (
        <div>
            <Typography variant="button">
                <Box display="flex" justifyContent="center" style={styles.title}>
                    Registros al {moment(new Date()).format('l')}
                </Box>
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="demo-controlled-open-select-label">Tipo</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={registro}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value={'Ingreso'}>Ingreso</MenuItem>
                    <MenuItem value={'Egreso'}>Egreso</MenuItem>
                </Select>
            </FormControl>
            {
                registro === 'Ingreso' ? (
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-controlled-open-select-label">Producto</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={product}
                                onChange={handleChangeProducts}
                                fullWidth
                            >
                                {
                                    totalProducts.map(p => <MenuItem onClick={() => productData(p.nombre, Number(p.precio))} value={p.id} key={p.id}>{p.nombre}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        {
                            selectedProduct.status ? (
                                <div>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={styles.title}>Producto seleccionado</TableCell>
                                                <TableCell
                                                    style={styles.title}>
                                                    Cantidad
                                                </TableCell>
                                                <TableCell style={styles.title}>Precio por unidad</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>{selectedProduct.name}</TableCell>
                                            <TableCell>{selectedProduct.quantity}
                                                <button onClick={addQuantity}>+</button>
                                                <button onClick={substractQuantity}>-</button>
                                            </TableCell>
                                            <TableCell>{selectedProduct.price}</TableCell>
                                        </TableBody>
                                    </Table>
                                    <Box display="flex" justifyContent="space-between" mt={5}>
                                        <Typography variant="h5">
                                            Monto total: {totalIncome}
                                        </Typography>
                                        <Button variant="contained" color="primary" onClick={showProducts}>Dar de alta</Button>
                                    </Box>
                                </div>
                            ) : null
                        }
                    </div>
                ) : registro === 'Egreso' ? (
                    <div>Egreso</div>
                ) : null
            }
        </div>
    )
}