import React from 'react';
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    contenedor: {
        display: "flex",
        backgroundColor: "grey",
    },
    hijo: {
        backgroundColor: "orange",
        margin: "10px",
        padding: "15px",
    }
})

const Events = () => {
    const classes = useStyles();
    return (
        <div className={classes.contenedor}>
            <form>
                <div className={classes.hijo}>
                    <h5>TITULO DE LA TAREA</h5>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rowsMax={4}
                        placeholder="Ingrese título"
                        variant="standard"
                    />
                </div>
                <div className={classes.hijo}>
                    <h5>DESCRIPCION</h5>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rowsMax={4}
                        placeholder="Ingrese tarea"
                        variant="standard"
                    />
                </div>
                <div className={classes.hijo}>
                    <h5>FECHA DE RECORDATORIO</h5>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default Events;