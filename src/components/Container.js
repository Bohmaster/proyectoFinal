import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Fixdrawer from './Fixdrawer';
import Navbar from './Navbar';
import Routing from './Routing'
import { BrowserRouter as Router } from 'react-router-dom';
import AppContext from '../appContext';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}))

const Container = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);

    const handlerOpenLinear = () => {
        setLoading(true);
    }

    const handlerCloseLinear = () => {
        setLoading(false);
    }

    const handlerLogin = () => {
        setLogin(true);
    }

    const handlerLogout = () => {
        setLogin(false);
    }

    return (
        <div className={classes.root}>
            <AppContext.Provider value={{
                loading: loading,
                handlerOpenLinear,
                handlerCloseLinear,
                login: login,
                handlerLogin,
                handlerLogout
            }}>
                <Navbar />
                <Router>
                    <Fixdrawer />
                    <div className={classes.content}>
                        <div className={classes.toolbar}></div>
                        <Routing />
                    </div>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default Container;