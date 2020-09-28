import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function Dough(props) {

    const data = {
        labels: ["Producto1", "Producto2", "Producto3", "Producto4"],
        datasets: [
            {
                data: [
                    40, 20, 30, 10
                ],
                backgroundColor: [
                    "#FFF86A",
                    "#FF6A6A",
                    "#6A99FF",
                    "#63FD6C"
                ],
            }

        ]
    }

    return (
        <div>
            <Doughnut
                data={data}
                width={400}
                height={300} />
        </div>
    )
}