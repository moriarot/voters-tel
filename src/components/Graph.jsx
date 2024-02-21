// BarGraph.jsx

import React from 'react';
import Chart from 'chart.js/auto';
// import { Char as ChartJS } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';

const Graph = () => {
  // Sample data for the bars
  const data = {
    labels: [''],
    // labels: ['לא הצביע               הצביע'],
    datasets: [
      {
        label: 'הצביע',
        data: [12], // Replace with your actual data
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'לא הצביע',
        data: [6], // Replace with your actual data
        backgroundColor: 'rgba(230,28,28,0.2)',
        borderColor: 'rgba(230,28,28,1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bar Graph Example</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
