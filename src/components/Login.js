import React, { useState } from 'react';
import { Typography, Button, makeStyles, TextField, Container, Avatar, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import conf from '../conf';
import Axios from 'axios';

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

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        Axios.post(`${conf.API_URL}/users/login`, credentials)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('Usuario: ', JSON.stringify(res.data))
            })
            .catch(error => console.log('Error: ' + error))
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon color="primary" />
                </Avatar>
                <Typography variant="h6" color="primary">
                    Sign in
                </Typography>
                <form onSubmit={onSubmitHandler} className={classes.form}>
                    <TextField
                        name="username"
                        variant="outlined"
                        placeholder="Username*"
                        required
                        fullWidth
                        margin="normal"
                        onChange={onChangeHandler}
                        value={credentials.username}
                    />
                    <TextField
                        name="password"
                        type="password"
                        variant="outlined"
                        placeholder="Password*"
                        required
                        fullWidth
                        margin="normal"
                        onChange={onChangeHandler}
                        value={credentials.password}
                    />
                    <Button
                    type="submit"
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    fullWidth>Sign in</Button>
                </form>
                
            </div>
            <Box display="flex" justifyContent="flex-end">
                <Button 
                    variant="text" 
                    color="primary">
                    Register
                </Button>
            </Box>
        </Container >
    )
}

export default Login;