import React, { useEffect } from 'react'
import { ReposLanguages } from '../../api'
import echart from 'echarts'
import './style.less'
import { createOptions } from './createOptions'

export interface Chart {
  langs: ReposLanguages
}

export const Chart = ({ langs }: Chart) => {
  useEffect(() => {
    const count_data = Object.entries(langs).map(([k, { count }]) => ({
      name: k,
      value: count
    }))

    const chart = echart.init(
      document.querySelector<HTMLCanvasElement>('#chart')
    )
    chart.setOption(createOptions(count_data))
  })

  return <canvas id="chart" width="400" height="400"></canvas>
}
