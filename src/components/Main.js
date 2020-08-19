import React, { useState } from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import Fixdrawer from './Fixdrawer';
import Navbar from './Navbar';
import Routing from './Routing'
import { Switch, useHistory } from 'react-router-dom';
import AppContext, { defaultGlobalState } from '../appContext';
import MuiAlert from '@material-ui/lab/Alert';
import LoginUser from '../components/LoginUser';

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

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alert, setAlert] = useState({
        status: '',
        message: ''
    })

    const handlerSnackbarAlert = (status, message) => {
        setAlert({
            status,
            message
        })
    }

    const handlerOpenLinear = () => {
        setLoading(true);
    }

    const handlerCloseLinear = () => {
        setLoading(false);
    }

    const handlerLogin = () => {
        setLogin(true);
        setOpenSnackbar(true);
    }

    const handlerLogout = () => {
        localStorage.removeItem('user');
        setLogin(false);
        history.push('/login');
    }

    const handlerOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handlerCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const Alert = (props) => {
        return (
            <MuiAlert elevation={6} variant="filled" {...props} />
        )
    };

    return (
        <div className={classes.root}>
            <AppContext.Provider value={{
                ...defaultGlobalState, /// ... => se llama spread
                ui: {
                    ...defaultGlobalState.ui,
                    loading
                },
                login,
                handlerOpenLinear,
                handlerCloseLinear,
                handlerLogin,
                handlerLogout,
                handlerSnackbarAlert,
                handlerOpenSnackbar,
                handlerCloseSnackbar
            }}>
                {
                    <Switch>
                        {
                          //  login ? (
                                <>
                                    <Navbar />
                                    <Fixdrawer />
                                    <div className={classes.content}>
                                        <div className={classes.toolbar}></div>
                                        <Routing />
                                    </div>
                                </>
                            //) : <LoginUser />
                        }
                    </Switch>
                }
                {
                    alert.status === '' ? null : (
                        <>
                            {
                                alert.status === 'success' ? (
                                    <Snackbar
                                        open={openSnackbar}
                                        autoHideDuration={6000}
                                        onClose={handlerCloseSnackbar}>
                                        <Alert
                                            onClose={handlerCloseSnackbar}
                                            severity="success">
                                            {alert.message}
                                        </Alert>
                                    </Snackbar>
                                ) : alert.status === 'error' ? (
                                    <Snackbar
                                        open={openSnackbar}
                                        autoHideDuration={6000}
                                        onClose={handlerCloseSnackbar}>
                                        <Alert
                                            onClose={handlerCloseSnackbar}
                                            severity="error">
                                            {alert.message}
                                        </Alert>
                                    </Snackbar>
                                ) : null
                            }
                        </>
                    )
                }
            </AppContext.Provider>
        </div>
    );
}

export default Main;