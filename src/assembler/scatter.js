import dataParser from './dataParser.js';
import echarts from 'echarts';
export default {
  /**
   * 组装条形图Options，以y为横轴，x轴展示数据
   * @param sourceData 源数据，数组
   * @param x 横坐标要展示的值在sourceData数组中的字段
   * @param y 纵坐标要展示的值在sourceData数组中的字段
   * @param z 展示的值的标签
   * 如数据源是[{date: '10/1', salesVolume: 100, level: '高'}]
   * 那么x的值传date,y的值传salesVolume，z的值传level
   * @param isStack 数据是否堆叠
   * @returns {{yAxis: {type: string}[], xAxis: {data: Array, type: string}[], color: string[], legend: {data: Array}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: Array, tooltip: {axisPointer: {type: string}, trigger: string}}}
   */
  assembleScatterOptions(sourceData, x, y, z, w) {
    const { seriesData } = dataParser.parseScatterOrLineData(sourceData, x, y, z, w);
    seriesData.forEach((series, index) => {
      series.type = 'scatter';
      series.symbolSize = function(data) {
        if (data[2] / 20 < 20) {
          return 20;
        }
        return data[2] / 20;
      };
      series.label = {
        emphasis: {
          show: true,
          formatter: function(param) {
            return param.data[3];
          },
          color: '#333333',
          position: 'top'
        }
      };
    });
    return {
      color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
        {
          offset: 0,
          color: 'rgb(129, 227, 238)'
        },
        {
          offset: 1,
          color: 'rgb(25, 183, 207)'
        }
      ]),
      backgroundColor: 'rgb(255,255,255)',
      tooltip: {},
      grid: {
        top: '50',
        left: '50',
        right: '50',
        bottom: '50'
      },
      xAxis: {
        max: 100,
        min: -100,
        axisLabel: {
          //设置x轴数值为%
          formatter: '{value} %',
          color: '#999999'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#DCDDE0'
          }
        }
      },
      yAxis: {
        max: 100,
        min: 0,
        axisLabel: {
          inside: true,
          color: '#999999',
          padding: [-20, 0, 0, -25],
          margin: 800,
          //设置y轴数值为%
          formatter: function(value) {
            if (value === 100) {
              return value + '%';
            }
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#DCDDE0'
          }
        }
      },
      series: seriesData
    };
  }
};
