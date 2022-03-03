import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import addVariablePie from 'highcharts/modules/variable-pie'

addVariablePie(Highcharts)

const PieChart = ({ candidates }) => {
  let data = candidates.map((each) => {
    return {
      name: `${each.first_name} ${each.last_name}`,
      y: each.vote_count,
    }
  })
  const chartOptions = {
    chart: {
      type: 'pie',
      height: 280,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Election Data',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    colors: ['#2085ec', '#72b4eb', '#0a417a', '#EF767A'],
    series: [
      {
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'Vote Count',
        data: data,
      },
    ],
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      className="highcharts-figure"
    />
  )
}

export default PieChart
