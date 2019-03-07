<template>
  <div :style="{height}">
    <chart :options="options"></chart>
  </div>
</template>

<script>
import Chart from './Chart'
export default {
  components: {
    Chart
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    height: {
      type: String,
      default: '180px'
    },
    mColor: {
      type: String,
      default: '#3499FE'
    },
    bgColor: {
      type: String,
      default: '#eff3f6'
    },
    keyName: {
      type: String,
      default: 'portraitName'
    },
    valName: {
      type: String,
      default: 'portraitRate'
    }
  },
  computed: {
    options () {
      var dataAxis = []
      var data = []
      var yMax = 100
      var dataShadow = []

      this.data.forEach(item => {
        dataAxis.push(item[this.keyName])
        data.push((item[this.valName]*100).toFixed(1))
        dataShadow.push(yMax)
      })

      return {
        grid: {
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          containLabel: true
        },
        tooltip: {
          formatter: '{c}%<br/>{b}',
          padding: [5, 20]
        },
        xAxis: {
          data: dataAxis,
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            color: '#2e3b4b'
          },
          axisLine: {
            lineStyle: {
              color: '#eaeaea'
            }
          }
        },
        yAxis: {
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            itemStyle: {
              color: this.mColor
            },
            type: 'bar',
            data: data,
            z: 10,
            label: {
              position: 'top',
              show: true,
              formatter: '{c}%'
            }
          },
          {
            type: 'bar',
            itemStyle: {
              color: this.bgColor,
              barBorderRadius: [20, 20, 0, 0]
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            silent: true,
            animation: false
          }
        ]
      }
    }
  }
}
</script>

