import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
// import { Char as ChartJS } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Graph = ({sumSupportVoted, sumSupportNotVoted}) => {
  useEffect(() => {
    // Register the datalabels plugin
    Chart.register('datalabels', ChartDataLabels);
  }, []);

  // Sample data for the bars
  const data = {
    labels: [''],
    // labels: ['לא הצביע               הצביע'],
    datasets: [
      {
        label: 'הצביע',
        data: [sumSupportVoted],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'לא הצביע',
        data: [sumSupportNotVoted],
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
    plugins: {
    datalabels: {
      display: true,
      color: "black",
      formatter: Math.round,
      anchor: "end",
      offset: 0,
      align: "start"
    }
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
