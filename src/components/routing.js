import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routing = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' render={() => <h1>Hola</h1>} />
                <Route exact path='/productos' render={() => <h1>productos</h1>} />
                <Route exact path='/ventas' render={() => <h1>ventas</h1>} />
            </Switch>
        </div>
    );
}

export default Routing;