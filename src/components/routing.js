import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppContext from '../appContext';
import CreateProduct from './products/create';
import { LinearProgress, Typography } from '@material-ui/core';
import ProductList from './products/list';


const Routing = () => {
    const context = useContext(AppContext);
    return (
        <div>
            {
                context.loading ? (
                    <LinearProgress />
                ) : null
            }
            <Switch>
                <Route exact path='/' render={() => <Typography variant="button" color="initial">Bienvenido</Typography>} />
                <Route exact path='/products/create' component={CreateProduct} />
                <Route exact path='/products/list' component={ProductList} />
                <Route exact path='/sales' render={() => <h1>Sales</h1>} />
            </Switch>
        </div>
    );
}

export default Routing;