import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
// import { Char as ChartJS } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './Graph.css';

const Graph = ({arrValuesGraph}) => {
  useEffect(() => {
    // Register the datalabels plugin
    // Chart.register('datalabels', ChartDataLabels);
  }, []);
  const data = {
    labels: ['הצביע', 'לא הצביע'],
    // labels: ['לא הצביע               הצביע'],
    datasets: [
      {
        label: 'תומך',
        data: arrValuesGraph[0],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'מתנגד',
        data: arrValuesGraph[1],
        backgroundColor: 'rgba(230,28,28,0.2)',
        borderColor: 'rgba(230,28,28,1)',
        borderWidth: 1,
      },
      {
        label: 'לא ידוע',
        data: arrValuesGraph[2],
        backgroundColor: 'rgba(250,188,5,0.2)',
        borderColor: 'rgba(250,188,5,1)',
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
      align: "start",
    }
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
      <div className='labels_graph' style={{right: '29.5vw'}}>{arrValuesGraph[0][0]}</div>
      <div className='labels_graph' style={{right: '27vw'}}>{arrValuesGraph[1][0]}</div>
      <div className='labels_graph' style={{right: '25vw'}}>{arrValuesGraph[2][0]}</div>
      <div className='labels_graph' style={{right: '21vw'}}>{arrValuesGraph[0][1]}</div>
      <div className='labels_graph' style={{right: '18.5vw'}}>{arrValuesGraph[1][1]}</div>
      <div className='labels_graph' style={{right: '16vw'}}>{arrValuesGraph[2][1]}</div>
    </div>
  );
};

export default Graph;
