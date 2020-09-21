import React, { useState, useContext } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import conf from '../../conf';
import AppContext from '../../appContext';

const styles = {
    textInputMargin: {
        margin: 10
    }
};

const productDefaultValues = {
    nombre: '',
    descripcion: '',
    precio: 0,
    rodado: 'a',
    color: 'a',
    stock: '1',
};
  
const CreateProduct = (props) => {
    const context = useContext(AppContext);

    const [product, setProduct] = useState(productDefaultValues);

    const handleChange = (evt) => {
        setProduct(
            {
                ...product,
                [evt.target.name]: evt.target.value
            }
        )
    };

    const handleClickUpLoad = () => {
        context.handleOpenLinear();
        Axios.post(`${conf.API_URL}/products`, product)
                .then(res => {
                    setProduct(productDefaultValues);
                    context.handleCloseLinear();
                    context.handleSnackbarAlert('success', 'Producto creado');
                })
                .catch(err => {
                    context.handleCloseLinear();
                    context.handleSnackbarAlert('error', 'No se pudo crear el producto');
                }); 
    };

    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField 
                    style={styles.textInputMargin} 
                    value={product.nombre} 
                    onChange={handleChange} 
                    name="nombre" 
                    label="Nombre del Producto" 
                    variant="outlined"/>
                <TextField 
                    style={styles.textInputMargin} 
                    value={product.descripcion} 
                    onChange={handleChange} 
                    name="descripcion" 
                    label="Descripcion" 
                    variant="outlined"/>
                <TextField 
                    style={styles.textInputMargin} 
                    value={product.precio} 
                    onChange={handleChange} 
                    name="precio" 
                    label="Precio" 
                    variant="outlined"/>
            </form>
            <br/>
            <Button onClick={handleClickUpLoad} variant="contained" color="primary" component="span">
                Crear Producto
            </Button>
        </div>
    );
}

export default CreateProduct