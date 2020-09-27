import React from 'react';
import { Box, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import GraphicLine from './GraphicLine';
import GraphicDoughnut from './GraphicDoughnut';
import Bounce from 'react-reveal/Bounce';
import moment from 'moment';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: 280,
        height: 140,
        paddingLeft: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    graphicLine: {
        width: 650,
        height: "auto",
    },
    graphicDoughnut: {
        width: 600,
        height: 350,
    }
})

export default function Dashboard() {

    const classes = useStyles();
    moment.locale('es');

    return (
        <Bounce right cascade>
            <Box className={classes.container}>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Paper className={classes.card} elevation={3} style={{ background: "#1976d2", color: "white" }}>
                        <Typography>Ingreso</Typography>
                        <Typography variant="h5">$3,500.00</Typography>
                        <Typography>al {moment(new Date()).format("ll")}</Typography>
                    </Paper>
                    <Paper className={classes.card} elevation={3} style={{ background: "#df0808", color: "white" }}>
                        <Typography>Egreso</Typography>
                        <Typography variant="h5">$1,500.00</Typography>
                        <Typography>al {moment(new Date()).format("ll")}</Typography>
                    </Paper>
                </Box>
                <Paper className={classes.graphicLine} elevation={3}>
                    <GraphicLine />
                </Paper>
                <TableContainer component={Paper} style={{ height: 350, marginTop: 40 }}>
                    <Table>
                        <TableHead style={{ background: "#4e342e" }}>
                            <TableRow>
                                <TableCell style={{ color: "white" }}>Producto vendido</TableCell>
                                <TableCell style={{ color: "white" }}>Fecha</TableCell>
                                <TableCell style={{ color: "white" }}>Cliente</TableCell>
                                <TableCell style={{ color: "white" }}>Método de pago</TableCell>
                                <TableCell style={{ color: "white" }}>Precio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Pizza Cuatro Quesos</TableCell>
                                <TableCell>22 de agosto</TableCell>
                                <TableCell>Manu Vant</TableCell>
                                <TableCell>Efectivo</TableCell>
                                <TableCell>$400</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Bounce>
    )
}
