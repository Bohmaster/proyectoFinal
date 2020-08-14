import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppContext from '../appContext';
import CreateProduct from './products/create';
import { LinearProgress } from '@material-ui/core';
import Login from './Login';
import ProductList from './products/list';

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
                <Route exact path='/' render={() => <h1>/</h1>}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/products/create' component={CreateProduct}/>
                <Route exact path='/products/list' component={ProductList} />
                <Route exact path='/sales' render={() => <h1>Sales</h1>} />
            </Switch>
        </div>
    );
}

export default Routing;