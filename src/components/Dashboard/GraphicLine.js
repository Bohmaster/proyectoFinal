import React from 'react';
import { Line } from 'react-chartjs-2';

export default function GraphicSales(props) {

    const data = {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
            {
                data: [
                    50, 200, 100, 300, 150, 25, 50, 10, 70
                ],
                label: "Ingresos por mes",
                fill: false,
                borderColor: "#1976d2",
                pointBorderWidth: 3,
                pointHoverRadious: 10,
                pointHoverBackgroundColor: "black",
                pointRadious: 10,
                pointHitRadious: 10,
            }
        ]
    }

    return (
        <div>
            <Line
                data={data} />
        </div>
    )
}