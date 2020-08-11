import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "textPrimary"
    }
})

const Routing = () => {
    const classes = useStyles();

    return (
        <div>
            <Router>
                <List component='nav'>

                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Link to='/' className={classes.link}>Inicio</Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to='/productos' className={classes.link}>Productos</Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to='/ventas' className={classes.link}>Ventas</Link>
                        </ListItemText>
                    </ListItem>

                </List>
                <Switch>
                    <Route exact path='/' />
                    <Route exact path='/productos' />
                    <Route exact path='/ventas' />
                </Switch>
            </Router>
        </div>
    )
}

export default Routing;