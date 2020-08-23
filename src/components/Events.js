import React, { useState, useContext } from 'react';
import { Button, TextField, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../appContext';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
    const context = useContext(AppContext);

    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: new Date().toDateString()
    })

    const [showEvents, setShowEvents] = useState([]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setEvent({
            ...event,
            [name]: value
        })
    }

    const onChangeHandlerDate = (date) => {
        setEvent({
            ...event,
            date: date.toDateString()
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newEvent = showEvents.concat(event);
        setShowEvents(newEvent);

        localStorage.setItem('Eventos', JSON.stringify(newEvent));
        console.log(newEvent)
        context.handlerOpenSnackbar();
        context.handlerSnackbarAlert('success', 'Evento agendado')
        setEvent({
            ...event,
            title: '',
            description: '',
        })
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
                            required
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
                            required
                            placeholder="Ingrese tarea"
                            variant="standard"
                            onChange={onChangeHandler}
                            value={event.description}
                        />
                    </div>
                    <div className={classes.hijo_}>
                        <h5>FECHA</h5>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                format="dd-MM-yyyy"
                                onChange={(date) => onChangeHandlerDate(date)}
                                value={event.date}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                    <Button type="submit" color="primary" variant="contained">Agendar</Button>
                </Box>
            </form>
            <Divider />
            <div className={classes.contenedor}>
                {
                    showEvents.map((e, id) =>
                        <React.Fragment key={id}>
                            <div className={classes.hijo_} key={e.date}>
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
                        </React.Fragment>
                    )
                }
            </div>
        </>
    )
}

export default Events;