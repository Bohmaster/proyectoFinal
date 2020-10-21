import React, { useState } from 'react';
import { Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import GraphicLine from './GraphicLine';
import Bounce from 'react-reveal/Bounce';
import moment from 'moment';
import conf from '../../conf';
import Axios from 'axios';
import { useEffect } from 'react';

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	card: {
		width: 260,
		height: 140,
		paddingLeft: 30,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: 10
	},
	graphicLine: {
		width: 650,
		maxHeight: 400,
		margin: 10
	},
})

export default function Dashboard() {

	const classes = useStyles();
	moment.locale('es');

	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [registersOfTheDay, setRegistersOfTheDay] = useState([]);

	useEffect(() => {
		Axios.get(`${conf.API_URL}/Registros`, {
			params: {
				filter: {
					where: {
						tipo: 0,
						fecha: {
							between: [new Date().setHours(0), new Date().setHours(23, 59)]
						}
					}
				}
			}
		})
			.then(res => {
				let income = 0;

				setRegistersOfTheDay(res.data);
				console.log(res.data)

				res.data.forEach(e => {
					income += Number(e.monto);
				})
				setTotalIncome(income);
			})
			.catch(err => console.log(err));

		Axios.get(`${conf.API_URL}/Registros`, {
			params: {
				filter: {
					where: {
						tipo: 1,
						fecha: {
							between: [new Date().setHours(0), new Date().setHours(23, 59)]
						}
					}
				}
			}
		})
			.then(res => {

				let expenses = 0;

				res.data.forEach(e => {
					expenses -= Number(e.monto);
				})
				setTotalExpenses(expenses);
			})
			.catch(err => console.log(err));
	}, [])

	return (
		<Bounce right cascade>
			<Box className={classes.container}>
				<Box display="flex" flexDirection="column" justifyContent="space-between">
					<Paper className={classes.card} elevation={3} style={{ background: "#1976d2", color: "white" }}>
						<Typography>Ingreso</Typography>
						<Typography variant="h5">{`$ ${totalIncome}`}</Typography>
						<Typography>al {moment(new Date()).format("ll")}</Typography>
					</Paper>
					<Paper className={classes.card} elevation={3} style={{ background: "#df0808", color: "white" }}>
						<Typography>Egreso</Typography>
						<Typography variant="h5">{`$ ${totalExpenses}`}</Typography>
						<Typography>al {moment(new Date()).format("ll")}</Typography>
					</Paper>
				</Box>
				<Paper className={classes.graphicLine} elevation={3}>
					<GraphicLine />
				</Paper>
				<TableContainer component={Paper} style={{ minHeight: 350, margin: 10 }}>
					<Table>
						<TableHead style={{ background: "#4e342e" }}>
							<TableRow>
								<TableCell style={{ color: "white" }}>Producto</TableCell>
								<TableCell style={{ color: "white" }}>Fecha</TableCell>
								<TableCell style={{ color: "white" }}>Precio de venta</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{registersOfTheDay.map(r =>
								<TableRow key={r.id}>
									<TableCell>{r.nombre}</TableCell>
									<TableCell>{moment(r.fecha).format("LL")}</TableCell>
									<TableCell>{r.monto}</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Bounce>
	)
}
