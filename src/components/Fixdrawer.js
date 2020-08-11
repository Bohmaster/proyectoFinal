import React from 'react';
import { makeStyles, Drawer } from '@material-ui/core'
import Routing from './Routing';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    toolbar: theme.mixins.toolbar,
}))

const Fixdrawer = () => {
    const classes = useStyles();
    return(
        <Drawer 
            className={classes.drawer} 
            variant='permanent'
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left">
            <div className={classes.toolbar}></div>
            <Routing/>
        </Drawer>
    )
}

export default Fixdrawer;