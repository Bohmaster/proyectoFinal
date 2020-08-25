import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Divider, Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../appContext';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import es from 'date-fns/locale/es';

const useStyles = makeStyles({
    contenedor: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    hijo: {
        width: "20%",
        flexDirection: "column",
        margin: "5px",
        padding: "5px",
        display: "flex",
        flexGrow: 1,
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

    useEffect(() => {
        const fetchEvents = localStorage.getItem('Eventos')
        const eventsJSON = JSON.parse(fetchEvents)
        if (eventsJSON) {
            eventsJSON.map(e => {
                if (e.date === new Date().toDateString()) {
                    context.handlerOpenSnackbar()
                    context.handlerSnackbarAlert('success', `${e.title}, ${e.description}`)
                }
            })
        }
    }, [])

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
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
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
            {
                showEvents.length ? (
                    <TableContainer>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titulo</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showEvents.map(e =>
                                    <TableRow>
                                        <TableCell>{e.title}</TableCell>
                                        <TableCell>{e.description}</TableCell>
                                        <TableCell>{e.date}</TableCell>
                                        <TableCell><Button color="primary" variant="contained">Editar</Button></TableCell>
                                        <TableCell><Button color="primary" variant="contained">Borrar</Button></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : null
            }

        </>
    )
}

export default Events;