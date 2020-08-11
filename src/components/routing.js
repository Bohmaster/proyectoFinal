import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Routing = () => {
    return (
        <div>
            <Router>
                <List component='nav'>

                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Link to='/'>Home</Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to='/productos'>Productos</Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to='/ventas'>Ventas</Link>
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