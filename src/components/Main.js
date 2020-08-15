import React, { useState } from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import Fixdrawer from './Fixdrawer';
import Navbar from './Navbar';
import Routing from './Routing'
import { BrowserRouter as Router } from 'react-router-dom';
import AppContext from '../appContext';
import LoginUser from './LoginUser';
import Alert from '@material-ui/lab/Alert';

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

const Main = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(true);

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

    const handlerCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    return (
        <div className={classes.root}>
            <AppContext.Provider value={{
                loading: loading,
                handlerOpenLinear,
                handlerCloseLinear,
                login: login,
                handlerLogin,
                handlerLogout,
            }}>
                {
                    login ? (
                        <Router>
                            <Navbar />
                            <Fixdrawer />
                            <div className={classes.content}>
                                <div className={classes.toolbar}></div>
                                <Routing />
                                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handlerCloseSnackbar}>
                                    <Alert onClose={handlerCloseSnackbar} severity="success">
                                        ¡Ha iniciado sesión!
                                    </Alert>
                                </Snackbar>
                            </div>
                        </Router>
                    ) : <LoginUser />
                }
            </AppContext.Provider>
        </div>
    );
}

export default Main;