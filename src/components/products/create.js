import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import conf from '../../conf';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AppContext from '../AppContext';
import { useContext } from 'react';

const styles = {
    textInputMargin: {
        margin: 10
    }
};

const Alert = (props) => {
    return (
        <MuiAlert elevation={6} variant="filled" {...props} />
    )
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
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const handleChange = (evt) => {
        console.log(evt.target.name)

        setProduct(
            {
                ...product,
                [evt.target.name]: evt.target.value
            }
        )
    };

    const handleClose = () => {
        setSnackbarOpen(
            false
        )
    }

    const handleClickUpLoad = () => {
        context.handlerOpenLinear();
        axios.post(`${conf.API_URL}/products`, product)
                .then(result => {
                    console.log(result.data);
                    setSnackbarOpen(true);
                    setProduct(productDefaultValues);
                    context.handlerCloseLinear();
                })
                .catch(err => {
                    console.log(err)
                    context.handlerCloseLinear();
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

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Producto creado
                </Alert>
            </Snackbar>
        </div>
    )
};

export default CreateProduct