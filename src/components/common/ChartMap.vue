<template>
  <div class="dss_chart_map" :style="{width:`${width}px`,height:`${height}`}"  ref="chart"></div>
</template>

<script>
import '@/dss-common/utils/china'
import { provinceData, cityData } from '@/dss-common/utils/data'
import echarts from 'echarts'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    colorList: {
      type: Array,
      default () {
        return ['#FB6042', '#F9B723', '#3399FF ']
      }
    },
    keyName: {
      type: String,
      default: 'fName'
    },
    valName: {
      type: String,
      default: 'fUserCount'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    type () {
      this.setOption()
    }
  },
  methods: {
    setOption () {
      const data = []
      const mapData = this.type === '省份' ? provinceData : cityData
      this.data.forEach((item, index) => {
        const geoCoord = mapData[item[this.keyName].replace(/(市|省)$/, '')]
        if (geoCoord) {
          data.push({
            name: item[this.keyName],
            value: geoCoord.concat(item[this.valName]),
            itemStyle: {
              normal: {
                color: this.colorList[index % this.colorList.length]
              }
            }
          })
        }
      })
      this.chart.clear()
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter (params) {
            if (params.seriesIndex === 1) {
              return
            }
            return `${params.name}<br>占比：${Number(params.value[2] * 100.0).toLocaleString()}%`
          }
        },
        geo: {
          map: 'china',
          layoutCenter: ['50%', '50%'],
          layoutSize: '100%',
          itemStyle: {
            normal: {
              areaColor: '#e6ecf1',
              borderColor: '#fff'
            },
            emphasis: {
              areaColor: '#e2e2e2',
              borderColor: '#fff'
            }
          },
          label: {
            emphasis: {
              show: false
            }
          }
        },
        series: [{
          name: '客流量',
          type: 'effectScatter', // 图表类型
          coordinateSystem: 'geo', // 坐标系类型
          symbolSize: 8,
          // symbolSize (val) {
          //   return Math.max(val[2] / 10, 8)
          // },
          rippleEffect: {
            brushType: 'stroke',
            scale: 4
          },
          showEffectOn: 'emphasis',
          hoverAnimation: true,
          data
        }]
      })
    },
    resize () {
      this.chart.resize()
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.setOption()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>
<style>
</style>
