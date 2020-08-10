import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Routing = () => {
    return(
        <div>
            <Router>
                <Link to='/'>Inicio</Link>
                <Link to='/productos'>Productos</Link>
                <Link to='/ventas'>Ventas</Link>
                <Switch>
                    <Route exact path='/' render={() => <h1>Inicio</h1>}/>
                    <Route exact path='/productos'/>
                    <Route exact path='/ventas'/>
                </Switch>
            </Router>
        </div>
    )
}

export default Routing