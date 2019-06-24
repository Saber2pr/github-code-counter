type Data = {
  name: string
  value: number
}[]

export const createOptions = (data: Data): echarts.EChartOption => ({
  backgroundColor: '#2c343c',

  title: {
    text: '统计结果',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },

  series: [
    {
      name: '统计结果',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data,
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: () => Math.random() * 200
    }
  ]
})
