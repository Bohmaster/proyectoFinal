import React from 'react';
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar,
    link: {
        textDecoration: "none",
    }
}))

const Fixdrawer = () => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left">
            <div className={classes.toolbar}></div>
            <List component='nav'>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
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
        </Drawer>
    );
}

export default Fixdrawer;