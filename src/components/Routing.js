import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AppContext from '../appContext';
import CreateProduct from './Products/Create';
import { LinearProgress } from '@material-ui/core';
import ProductList from './Products/List';
import SalesList from './SalesList';
import LoginUser from './LoginUser';
import ProductID from './Products/ProductID';
import Events from './Events';
import Dashboard from './Dashboard/Dashboard';

const Routing = () => {
    const context = useContext(AppContext);
    return (
        <div>
            {
                context.ui.loading ? (
                    <LinearProgress />
                ) : null
            }
            <Route
                exact path='/products/edit/:id'
                component={ProductID} />
            <Route
                exact path='/products/create'
                component={CreateProduct} />
            <Route
                exact path='/products'
                component={ProductList} />
            <Route
                exact path='/events'
                component={Events} />
            <Route
                exact path='/sales'
                component={SalesList} />
            <Route
                exact path='/login'
                component={LoginUser} />
            <Route
                exact path='/'
                component={Dashboard}
            >
            </Route>
        </div>
    );
}

export default Routing;