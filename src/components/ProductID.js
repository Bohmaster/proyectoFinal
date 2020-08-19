import React, { useEffect, useState } from 'react';
import conf from '../conf';
import { useParams } from 'react-router';
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


    const [prod, setProd] = useState('')

    const { id } = useParams();

    useEffect(() => {
        Axios.get(`${conf.API_URL}/products/${id}`)
            .then(res => {
                console.log(res.data)
                setProd(res.data)
            })
    }, [id])

    const handleChange = (evt) => {
        setProd({
            ...prod,
            [evt.target.name]: evt.target.value
        })
    };

    const actualizarButton = () => {
        Axios.put(`${conf.API_URL}/products/${id}`, prod)
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    onChange={handleChange}
                    value={prod.name}
                    name="name"
                    id="filled-name"
                    label="Name"
                    variant="filled"
                />
                <TextField
                    onChange={handleChange}
                    value={prod.description}
                    name="description"
                    id="filled-name"
                    label="Description"
                    variant="filled"
                />
                <TextField
                    onChange={handleChange}
                    value={prod.price}
                    name="price"
                    id="filled-name"
                    label="price"
                    variant="filled"
                />
            </form>
            <Button onClick={actualizarButton} variant="contained" color="primary">
                Actualizar
            </Button>
        </div>
    )
}

export default ProductID;