import React, { useContext } from 'react';
import { AppBar, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import AppContext from '../appContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
    appBar: {
        width: `calc(100% - ${240}px)`,
        marginLeft: 240,
    },
    title: {
        flexGrow: 1,
        fontWeight: "bolder"
    },
}))

const Navbar = () => {
    const classes = useStyles();
    const context = useContext(AppContext);
    return (
        <div>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="button"
                        color="initial">Sistema de gestión</Typography>
                    <Button color="inherit" onClick={() => context.handleLogout()}>
                        <ExitToAppIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;