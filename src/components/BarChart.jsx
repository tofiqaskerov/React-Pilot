import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { analyzeData } from '../analyze';
ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);
const BarChart = ({data}) => {
   
    const analyzedData = analyzeData(data);
   const chartData = {
    labels: ["2010", "2017"],
    datasets: [{
        label: 'Bar',
        data: [analyzedData.status0TotalLen, analyzedData.status1TotalLen],
        borderWidth: 1,
        backgroundColor: ["#ff6f61"]
       }]
    }  ;
  return (
    <Bar data={chartData}/>
  )
}

export default BarChart