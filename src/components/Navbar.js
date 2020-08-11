import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    appBar: {
        width: `calc(100% - ${240}px)`,
        marginLeft: 240,
      },
}))

const Navbar = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position='fixed' color='primary' className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h4" color="initial">Sistema de gestión</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;