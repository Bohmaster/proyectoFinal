import React, { useState } from 'react';
import { Button, TextField, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    contenedor: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    hijo_: {
        width: "30%",
        flexDirection: "column",
        margin: "5px",
        padding: "5px",
        display: "flex",
        flexGrow: 1,
    },
})

const Events = () => {
    const classes = useStyles();

    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: ''
    })

    const [showEvents, setShowEvents] = useState([]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setEvent({
            ...event,
            [name]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setShowEvents(showEvents.concat(event));
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className={classes.contenedor}>
                    <div className={classes.hijo_}>
                        <h5>TITULO</h5>
                        <TextField
                            name="title"
                            multiline
                            rowsMax={4}
                            placeholder="Ingrese título"
                            variant="standard"
                            onChange={onChangeHandler}
                            value={event.title}
                        />
                    </div>
                    <div className={classes.hijo_}>
                        <h5>DESCRIPCION</h5>
                        <TextField
                            name="description"
                            multiline
                            rowsMax={4}
                            placeholder="Ingrese tarea"
                            variant="standard"
                            onChange={onChangeHandler}
                            value={event.description}
                        />
                    </div>
                    <div className={classes.hijo_}>
                        <h5>FECHA</h5>
                        <TextField
                            name="date"
                            type="date"
                            onChange={onChangeHandler}
                            value={event.date}
                        />
                    </div>
                </div>
                <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                    <Button type="submit" color="primary" variant="contained">Agendar</Button>
                </Box>
            </form>
            <Divider />
            <div className={classes.contenedor}>
                {
                    showEvents.map(e =>
                        <>
                            <div className={classes.hijo_}>
                                <h5>TITULO</h5>
                                <p>{e.title}</p>
                            </div>
                            <div className={classes.hijo_}>
                                <h5>DESCRIPCION</h5>
                                <p>{e.description}</p>
                            </div>
                            <div className={classes.hijo_}>
                                <h5>FECHA</h5>
                                <p>{e.date}</p>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Events;