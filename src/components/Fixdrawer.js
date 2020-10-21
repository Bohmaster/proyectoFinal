import React, { useState } from 'react';
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText, MenuItem, Menu } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EventIcon from '@material-ui/icons/Event';
import ContactsIcon from '@material-ui/icons/Contacts';
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
    },
}))

const Fixdrawer = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">
                <div className={classes.toolbar}></div>
                <List component='nav'>
                    <Link to='/diary' className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <ContactsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Agenda" />
                        </ListItem>
                    </Link>
                    <ListItem button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText primary="Productos" />
                    </ListItem>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Link to='/products/create' className={classes.link}>
                            <MenuItem onClick={handleClose}>Nuevo producto</MenuItem>
                        </Link>
                        <Link to='/products' className={classes.link}>
                            <MenuItem onClick={handleClose}>Lista de productos</MenuItem>
                        </Link>
                    </Menu>

                    <Link to='/sales' className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <AttachMoneyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Libro diario" />
                        </ListItem>
                    </Link>
                    <Link to='/events' className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary="Eventos" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
}

export default Fixdrawer;