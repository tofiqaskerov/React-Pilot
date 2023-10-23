import React from 'react'
import { Pie } from 'react-chartjs-2'
import { analyzeData } from '../analyze';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement,Tooltip,Legend)
const PieChart = ({data}) => {
  const analyzedData = analyzeData(data)

  const chartData = {
    labels: [`2010: ${analyzedData.status0Percentage}%`, `2017: ${analyzedData.status1Percentage}%`],
    datasets: [
      {
        data: [analyzedData.status0Percentage, analyzedData.status1Percentage],
        backgroundColor: ['#ff6f61', '#6d76f7'],
      },
    ],
  };
  
  return (

    <Pie  data={chartData}  />
  )
}

export default PieChart

