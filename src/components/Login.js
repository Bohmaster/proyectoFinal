import React from 'react';
import { Typography, Button, makeStyles, TextField, Container, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
}))

const Login = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon color="primary" />
                </Avatar>
                <Typography variant="h6" color="primary">
                    Sign in
                </Typography>
                <form className={classes.form}>
                        <TextField
                            name="user"
                            variant="outlined"
                            placeholder="User*"
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="password"
                            type="password"
                            variant="outlined"
                            placeholder="Password*"
                            required
                            fullWidth
                            margin="normal"
                        />
                </form>
                <Button 
                    className={classes.button} 
                    color="primary" 
                    variant="contained" 
                    fullWidth>Sign in</Button>
            </div>
        </Container >
    )
}

export default Login;