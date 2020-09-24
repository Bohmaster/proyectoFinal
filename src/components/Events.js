import React, { useState, useContext, useEffect } from 'react';
import {
    Button,
    TextField,
    Divider,
    Box,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../appContext';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import es from 'date-fns/locale/es';
import moment from 'moment';
import 'moment/locale/es';
import Axios from 'axios';
import conf from '../conf';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    box: {
        display: "flex",
        width: "30%",
        flexDirection: "column",
        margin: "5px",
        padding: "5px",
    },
    tableRow: {
        background: "#bdbdbd"
    },
    tableRoww: {
        background: "red"
    }
})

moment.locale("es")

const Events = () => {
    const classes = useStyles();
    const context = useContext(AppContext);

    const [event, setEvent] = useState({
        nombre: '',
        descripcion: '',
        fecha: new Date()
    })

    const [events, setEvents] = useState([]);

    useEffect(() => {
        Axios.get(`${conf.API_URL}/Eventos`)
            .then(res => {

                const eventsOfToday = [];
                const otherEvents = []

                res.data.forEach(e => {
                    if (moment(e.fecha).format('LL') === moment(new Date()).format('LL')) {
                        eventsOfToday.push(e);
                    } else if (new Date(e.fecha).getTime() < new Date().setHours(1)) {
                        Axios.delete(`${conf.API_URL}/Eventos/${e.id}`)
                    } else {
                        otherEvents.push(e);
                    }
                })
                setEvents([...eventsOfToday, ...otherEvents]);

                context.handleSnackbarAlert('info', `Tiene ${eventsOfToday.length} eventos`);
                context.handleNotification(eventsOfToday);
            })
            .catch(err => context.handleSnackbarAlert('error', 'No se pudo acceder al servidor'));
    }, [])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setEvent({
            ...event,
            [name]: value
        })
    }

    const handleDelete = id => () => {
        Axios.delete(`${conf.API_URL}/Eventos/${id}`)
            .then(res => {
                Axios.get(`${conf.API_URL}/Eventos`)
                    .then(res => {
                        setEvents(res.data);
                        context.handleSnackbarAlert('success', 'Producto eliminado')
                    })
            })
            .catch(err => context.handleSnackbarAlert('error', 'No se pudo eliminar el producto'))
    }

    const onChangeHandlerDate = (date) => {
        setEvent({
            ...event,
            fecha: date
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();

        Axios.post(`${conf.API_URL}/Eventos`, event)
            .then(res => {
                Axios.get(`${conf.API_URL}/Eventos`)
                    .then(res => {
                        setEvents(res.data);
                        context.handleSnackbarAlert('success', 'Evento agendado');
                    })
                    .catch(err => {
                        context.handleSnackbarAlert('error', 'No se pudo agendar el evento');
                    })
            })
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className={classes.container}>
                    <div className={classes.box}>
                        <h5>TITULO</h5>
                        <TextField
                            name="nombre"
                            multiline
                            rowsMax={4}
                            required
                            placeholder="Ingrese título"
                            variant="standard"
                            onChange={onChangeHandler}
                            value={event.nombre}
                        />
                    </div>
                    <div className={classes.box}>
                        <h5>DESCRIPCION</h5>
                        <TextField
                            name="descripcion"
                            multiline
                            rowsMax={4}
                            required
                            placeholder="Ingrese tarea"
                            variant="standard"
                            onChange={onChangeHandler}
                            value={event.descripcion}
                        />
                    </div>
                    <div className={classes.box}>
                        <h5>FECHA</h5>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                            <DatePicker
                                format="dd-MM-yyyy"
                                onChange={(date) => onChangeHandlerDate(date)}
                                value={event.fecha}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <Box display="flex" justifyContent="space-between" alignItems="center" height="80px">
                    <div>
                        <h4>EVENTOS AGENDADOS</h4>
                    </div>
                    <div>
                        <Button type="submit" color="primary" variant="contained">Agendar</Button>
                    </div>
                </Box>
            </form>
            <Divider />
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
                        {
                            events.map(e =>
                                <React.Fragment key={e.id}>
                                    {
                                        moment(e.fecha).format('LL') === moment(new Date()).format('LL') ? (
                                            <TableRow className={classes.tableRow}>
                                                <TableCell>{e.nombre}</TableCell>
                                                <TableCell>{e.descripcion}</TableCell>
                                                <TableCell>{moment(e.fecha).format('LL')}</TableCell>
                                                <TableCell>
                                                    <Button onClick={handleDelete(e.id)} variant="contained" color="primary">
                                                        Borrar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ) : moment(e.fecha).format('LL') !== moment(new Date()).format('LL') ? (
                                            <TableRow>
                                                <TableCell>{e.nombre}</TableCell>
                                                <TableCell>{e.descripcion}</TableCell>
                                                <TableCell>{moment(e.fecha).format('LL')}</TableCell>
                                                <TableCell>
                                                    <Button onClick={handleDelete(e.id)} variant="contained" color="primary">
                                                        Borrar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ) : null
                                    }
                                </React.Fragment>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Events;