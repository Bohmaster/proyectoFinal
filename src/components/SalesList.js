import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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
}));

const SalesList = () => {
    const classes = useStyles();

    const [total, setTotal] = useState('');
    const [productsName, setProductName] = useState([])

    const handleChange = (event) => {
        setTotal(event.target.value);
    };

    useEffect(() => {
        axios.get(`${conf.API_URL}/products`)
            .then(response => {
                setProductName(response.data)
            })
            .catch(err => console.log(err))
    }, []
    );

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select
                    value={total}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="" disabled>
                        Ingreso/Egreso
                    </MenuItem>

                    <MenuItem>Ingreso</MenuItem>
                    <MenuItem>Egreso</MenuItem>
                </Select>
                <FormHelperText>Indicar el movimiento de caja</FormHelperText>
            </FormControl>
            <div>
                <FormControl className={classes.formControl}>
                    <Select
                        value={total}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="" disabled>
                            Producto
                    </MenuItem>
                        <MenuItem>{productsName.map(
                            product => <li>{product.name}</li>
                        )}
                        </MenuItem>
                    </Select>
                    <FormHelperText>Elegir el producto vendido</FormHelperText>
                </FormControl>
            </div>
            <div>
                Los productos son: {productsName.map(
                product => <li>{product.name}</li>
            )}
            </div>
        </div>
    )
}

export default SalesList;