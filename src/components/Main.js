import React, { useState } from 'react';
import { Box, Button, makeStyles, Snackbar } from '@material-ui/core';
import Fixdrawer from './Fixdrawer';
import Navbar from './Navbar';
import Routing from './Routing'
import { Switch, useHistory } from 'react-router-dom';
import AppContext, { defaultGlobalState } from '../appContext';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    button: {
        fontSize: "12px",
        marginTop: "5px",
        borderRadius: "50px",
        color: "white",
        fontWeight: "bold"
    }
}))

const Main = () => {
    const classes = useStyles();
    const history = useHistory();

    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alert, setAlert] = useState({
        status: '',
        message: ''
    })
    const [notifications, setNotifications] = useState([])

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
        setLogin(false);
        history.push('/login');
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    };

    const handleOpenDialog = () => {
        setOpenDialog(true)
    };


    const handleNotification = (notifications) => {
        setNotifications(notifications)
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
                openDialog,
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
                                            <Box display="flex" flexDirection="column">
                                                <div>
                                                    {alert.message}
                                                </div>
                                                <Button
                                                    onClick={handleOpenDialog}
                                                    className={classes.button}
                                                >
                                                    Ver
                                                </Button>
                                            </Box>
                                        </Alert>
                                    </Snackbar>
                                ) : null
                            }
                        </>
                    )
                }
                <Dialog
                    open={openDialog}
                    keepMounted
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>{"EVENTOS DEL DÍA"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {notifications.map(n =>
                                <React.Fragment key={n.id}>
                                    <h4>{n.nombre}</h4> <p>{n.descripcion}</p>
                                </React.Fragment>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppContext.Provider>
        </div>
    );
}

export default Main;