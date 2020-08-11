import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import conf from '../../conf';

const styles = {
    textInputMargin: {
        margin: 10
    }
}
  
const CreateProduct = (props) => {
    const [product, setProduct] = React.useState({
        name: '',
        description: '',
        price: 0,
        isImportant: true,
        created: new Date()
    });

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
        axios.post(`${conf.API_URL}/products`, product)
                .then(result => {
                    console.log(result.data);
                })
                .catch(err => {
                    console.log(err)
                }); 
    }

    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField style={styles.textInputMargin} onChange={handleChange} name="name" id="outlined-basic" label="Nombre del Producto" variant="outlined"/>
                <TextField style={styles.textInputMargin} onChange={handleChange} name="description" id="outlined-basic" label="Descripcion" variant="outlined"/>
                <TextField style={styles.textInputMargin} onChange={handleChange} name="price" id="outlined-basic" label="Precio" variant="outlined"/>
            </form>
            <br/>
            <Button onClick={handleClickUpLoad} variant="contained" color="primary" component="span">
                Upload
            </Button>
        </div>
    )
};

export default CreateProduct