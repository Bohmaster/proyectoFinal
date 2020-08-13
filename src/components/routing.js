import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppContext from './AppContext';
import CreateProduct from './products/create';
import { LinearProgress } from '@material-ui/core';

const Routing = () => {
    const context = useContext(AppContext);
    return (
        <div>
            {
                context.loading ? (
                    <LinearProgress/>
                ) : null
            }
            <Switch>
                <Route exact path='/' render={() => <h1>Hola</h1>} />
                <Route exact path='/products' component={CreateProduct} />
                <Route exact path='/sails' render={() => <h1>ventas</h1>} />
            </Switch>
        </div>
    );
}

export default Routing;