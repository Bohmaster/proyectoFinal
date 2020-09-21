import React, { useEffect, useState } from 'react';
import conf from '../../conf';
import { useParams, useHistory } from 'react-router';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const ProductID = () => {
    const classes = useStyles();

    const history = useHistory();

    const [product, setProduct] = useState({
        nombre: '',
        descripcion: '',
        precio: 0,
        rodado: 'a',
        color: 'a',
        stock: '1',
    });

    const { id } = useParams();

    useEffect(() => {
        Axios.get(`${conf.API_URL}/products/${id}`)
            .then(res => {
                setProduct(res.data);
            })
    }, [id]);

    const handleChange = (evt) => {
        setProduct({
            ...product,
            [evt.target.name]: evt.target.value
        })
    };

    const updateProduct = () => {
        Axios.put(`${conf.API_URL}/products/${id}`, product)
            .then(res => {
                history.push('/products');
            })
    };

    return (
        <div>
            <form className={classes.root}>
                <TextField
                    onChange={handleChange}
                    value={product.nombre}
                    name="nombre"
                    label="Nombre"
                />
                <TextField
                    onChange={handleChange}
                    value={product.descripcion}
                    name="descripcion"
                    label="Descripcion"
                />
                <TextField
                    onChange={handleChange}
                    value={product.precio}
                    name="precio"
                    label="Precio"
                />
            </form>
            <Button onClick={updateProduct} variant="contained" color="primary">
                Actualizar
            </Button>
        </div>
    );
}

export default ProductID;