import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import conf from '../../conf';
import AppContext from '../../appContext';
import { useContext } from 'react';

const styles = {
    textInputMargin: {
        margin: 10
    }
};

const productDefaultValues = {
    name: '',
    description: '',
    price: 0,
    isImportant: true,
    created: new Date()
};
  
const CreateProduct = (props) => {
    const context = useContext(AppContext);

    const [product, setProduct] = React.useState(productDefaultValues);

    const handleChange = (evt) => {
        console.log(evt.target.name)

        setProduct(
            {
                ...product,
                [evt.target.name]: evt.target.value
            }
        )
    };

    const handleClickUpLoad = () => {
        context.handlerOpenLinear();
        axios.post(`${conf.API_URL}/products`, product)
                .then(result => {
                    console.log(result.data);
                    setProduct(productDefaultValues);
                    context.handlerCloseLinear();
                    context.handlerOpenSnackbar();
                    context.handlerSnackbarAlert('success', 'Producto creado');
                })
                .catch(err => {
                    console.log(err)
                    context.handlerCloseLinear();
                    context.handlerOpenSnackbar();
                    context.handlerSnackbarAlert('error', 'No se pudo crear el producto');
                }); 
    }

    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField style={styles.textInputMargin} value={product.name} onChange={handleChange} name="name" id="outlined-basic" label="Nombre del Producto" variant="outlined"/>
                <TextField style={styles.textInputMargin} value={product.description} onChange={handleChange} name="description" id="outlined-basic" label="Descripcion" variant="outlined"/>
                <TextField style={styles.textInputMargin} value={product.price} onChange={handleChange} name="price" id="outlined-basic" label="Precio" variant="outlined"/>
            </form>
            <br/>
            <Button onClick={handleClickUpLoad} variant="contained" color="primary" component="span">
                Upload
            </Button>
        </div>
    )
};

export default CreateProduct