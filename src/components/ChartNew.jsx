import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';


const ChartNew = () => {
        useEffect(() => {
          Chart.register(Chart.controllers.line);
        }, []);
  const data = {
    labels: [
      '47:19', '46:47', '36:31', '36:31', '36:31', '23:31', '23:31', '23:31', '13:39', '13:13'
    ],
    datasets: [
      {
        label: 'rsrp',
        data: [-109, -109, -107, -106, -107, -106, -106, -106, -106, -106],
        backgroundColor: '#4cceac',
        borderColor: '#4cceac',
      },
      {
        label: 'rsrq',
        data: [-12, -12, -11, -11, -11, -11, -11, -11, -11, -11],
        backgroundColor: '#a4a9fc',
        borderColor: '#a4a9fc',
      },
      {
        label: 'sinr',
        data: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        backgroundColor: '#f1b9b7',
        borderColor: '#f1b9b7',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartNew;
