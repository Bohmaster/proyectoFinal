import React from 'react';
import {Link} from 'react-router-dom';
export default () => {

    return (
        <div>
            <h1>Productis</h1>
            <Link to='/products/create'><button>Puto</button></Link>
        </div>
    )
}