import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import AppContext from '../appContext';
import CreateProduct from './products/create';
import { LinearProgress } from '@material-ui/core';
import ProductList from './products/list';
import SalesList from './SalesList';
import LoginUser from './LoginUser';
import Product from './Product';

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
                exact path='/products/create'
                component={CreateProduct} />
            <Route
                exact path='/products/list'
                component={ProductList} />
            <Route
                exact path='/products'
                render={() => <h1>Productos</h1>} />
            <Route
                exact path='/products/:id'
                component={Product} />
            <Route
                exact path='/sales'
                component={SalesList} />
            <Route
                exact path='/login'
                component={LoginUser} />
        </div>
    );
}

export default Routing;