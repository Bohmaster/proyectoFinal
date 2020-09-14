import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import conf from '../conf';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))


const SalesList = () => {
    const classes = useStyles();

    const [tipo, setTipo] = useState('');
    const [productList, setProductList] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);


    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };

    const handleChangeProduct = (event) => {
        setSelectedProductId(event.target.value);
    };

    useEffect(() => {
        axios.get(`${conf.API_URL}/products/`)
            .then(response => {
                setProductList(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">tipo</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={tipo}
                    onChange={handleChangeTipo}
                >
                    <MenuItem value="" disabled>
                        <em>----</em>
                    </MenuItem>
                    <MenuItem value={0}>Egreso</MenuItem>
                    <MenuItem value={1}>Ingreso</MenuItem>
                </Select>
            </FormControl>
            {
                tipo === 1 ?
                    (
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={selectedProductId}
                                onChange={handleChangeProduct}
                            >
                                <MenuItem value="" disabled>
                                    <em>----</em>
                                </MenuItem>
                                {
                                    productList.map(product => <MenuItem value={product.id}>{product.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    ) :
                    null
            }
        </div>
    )
};

export default SalesList;