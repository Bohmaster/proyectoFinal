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
        color: "inherit"
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
                <Link to='/' className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </Link>
                <Link to='/products' className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText primary="Productos" />
                    </ListItem>
                </Link>
                <Link to='/sales' className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ventas"/>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
}

export default Fixdrawer;