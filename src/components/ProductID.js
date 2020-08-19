import React, { useEffect, useState } from 'react';
import conf from '../conf';
import { useParams } from 'react-router';
import Axios from 'axios';

const ProductID = () => {
    const [prod, setProd] = useState('')

    const { id } = useParams();

    useEffect(() => {
        Axios.get(`${conf.API_URL}/products/${id}`)
            .then(res=> {
                console.log(res.data)
                setProd(res.data)
            })
    },[id])

    return(
        <div>
            {prod.name} - {prod.price}
        </div>
    )
}

export default ProductID;