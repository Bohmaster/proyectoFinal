import React, { useState } from 'react';
import { Box, Button, makeStyles, Snackbar } from '@material-ui/core';
import Fixdrawer from './Fixdrawer';
import Navbar from './Navbar';
import Routing from './Routing'
import { Switch, useHistory } from 'react-router-dom';
import AppContext, { defaultGlobalState } from '../appContext';
import MuiAlert from '@material-ui/lab/Alert';
import LoginUser from '../components/LoginUser';
import { Modal, Paper } from '@material-ui/core';

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
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        height: 650,
        alignItems: 'center',
        justifyContent: 'center',
    }
}))



const Main = () => {
    const classes = useStyles();


    const history = useHistory();

    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [login, setLogin] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [alert, setAlert] = useState({
        status: '',
        message: ''
    })

    const [notification, setNotification] = useState([])

    const handleSnackbarAlert = (status, message) => {
        setAlert({
            status,
            message
        });
        setOpenSnackbar(true);
    }

    const handleOpenLinear = () => {
        setLoading(true);
    }

    const handleCloseLinear = () => {
        setLoading(false);
    }

    const handleLogin = () => {
        setLogin(true);
        setOpenSnackbar(true);
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setLogin(false);
        history.push('/login');
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    };

    const handleOpenModal = () => {
        setOpenModal(true)
    };


    const handleNotification = (e) => {
        console.log('handle', e)
        setNotification(e)
    };

    const Alert = (props) => {
        return (
            <MuiAlert elevation={6} variant="filled" {...props} />
        )
    };

    return (
        <div className={classes.root}>
            <AppContext.Provider value={{
                ...defaultGlobalState,
                ui: {
                    ...defaultGlobalState.ui,
                    loading
                },
                login,
                openModal,
                handleOpenLinear,
                handleCloseLinear,
                handleLogin,
                handleLogout,
                handleSnackbarAlert,
                handleCloseSnackbar,
                handleNotification
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
                                        onClose={handleCloseSnackbar}>
                                        <Alert
                                            onClose={handleCloseSnackbar}
                                            severity="success">
                                            {alert.message}
                                        </Alert>
                                    </Snackbar>
                                ) : alert.status === 'error' ? (
                                    <Snackbar
                                        open={openSnackbar}
                                        autoHideDuration={6000}
                                        onClose={handleCloseSnackbar}>
                                        <Alert
                                            onClose={handleCloseSnackbar}
                                            severity="error">
                                            {alert.message}
                                        </Alert>
                                    </Snackbar>
                                ) : alert.status === 'info' ? (
                                    <Snackbar
                                        open={openSnackbar}
                                        autoHideDuration={6000}
                                        onClose={handleCloseSnackbar}>
                                        <Alert
                                            onClose={handleCloseSnackbar}
                                            severity="info">
                                            {alert.message}
                                            <Button onClick={handleOpenModal}>
                                                Ver
                                            </Button>
                                        </Alert>
                                    </Snackbar>
                                ) : null
                            }
                        </>
                    )
                }
                {
                    console.log(notification)
                }
            </AppContext.Provider>
        </div>
    );
}

export default Main;