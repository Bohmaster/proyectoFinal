import { Container, Box, makeStyles, Paper, Typography, ListItem, List } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "space-around"
    },
    card: {
        width: 300,
        height: 300,
        textAlign: "center",
        paddingTop: 10
    }
})

export default function Dashboard() {

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Paper className={classes.card}>
                <Typography variant="button">Ultimos registros</Typography>
                <List>

                </List>
            </Paper>
            <Paper className={classes.card}>
                <Typography variant="button">Ultimos registros</Typography>
            </Paper>
            <Paper className={classes.card}>
                <Typography variant="button">Ultimos registros</Typography>
            </Paper>
        </Box>
    )
}
