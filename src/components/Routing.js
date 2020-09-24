import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AppContext from '../appContext';
import CreateProduct from './products/Create';
import { LinearProgress } from '@material-ui/core';
import ProductList from './products/List';
import SalesList from './SalesList';
import LoginUser from './LoginUser';
import ProductID from './products/ProductID';
import Events from './Events';
import Dash from './Dashboard';

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
                component={Dash}
            >

            </Route>
        </div>
    );
}

export default Routing;