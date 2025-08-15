import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductSalesChart = ({ chartData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Quantity Sold Per Product',
                font: {
                    size: 18
                }
            },
        },
    };

    const data = {
        labels: chartData.labels, 
        datasets: [
            {
                label: 'Quantity Sold',
                data: chartData.data, 
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
};

export default ProductSalesChart;
