import dataParser from './dataParser.js';

const defaultColor = [
  { color: '#2E8DFF', areaColor: 'rgba(46, 141, 255, 0.13)' },
  { color: '#37BE8F', areaColor: 'rgba(55, 190, 143, 0.13)' }
];

export default {
  /**
   * 组装柱状图Options,常规以x为横轴，y展示数据
   * @param sourceData 源数据，数组
   * @param x 横坐标要展示的值在sourceData数组中的字段
   * @param y 纵坐标要展示的值在sourceData数组中的字段
   * @param z 展示的值的标签
   * 如数据源是[{date: '10/1', salesVolume: 100, level: '高'}]
   * 那么x的值传date,y的值传salesVolume，z的值传level
   * @param fixXAxisData 确定的x轴坐标list，不传则从数据里解析
   * @param sortLegendData 要排序的legend data Array {label: xxx, value: xxx} label是legend要显示的值，value是组装数据时用到的值
   * @param sortXConfig 是否对x轴进行排序，一般x轴为时间或者日期时，如果没有传入固定的fixXAxisData，那么需要对日期进行排序
   * @returns {{yAxis: {axisLabel: {fontFamily: string, color: string, fontWeight: number}, axisLine: {lineStyle: {color: string}}, minInterval: number, splitLine: {color: string, show: boolean}, show: boolean, type: string}[], xAxis: {axisLabel: {fontFamily: string, color: string, fontWeight: number}, data: *, axisLine: {lineStyle: {color: string}, show: boolean}, axisTick: {lineStyle: {color: string, width: number}, length: number}, type: string, boundaryGap: boolean}[], color: *[], legend: {itemGap: number, data: Array, itemHeight: number, show: boolean, icon: string, itemWidth: number, right: number, textStyle: {fontFamily: string, color: string, fontSize: number}}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: Array, tooltip: {show: boolean, axisPointer: {label: {backgroundColor: string, show: boolean}, type: string}, trigger: string}, title: {left: number, text: string, textStyle: {fontFamily: string, color: string, fontSize: number, fontWeight: string}}}}
   */
  assembleLineOptions(sourceData, x, y, z, fixXAxisData, sortLegendData, sortXConfig = { sortBy: undefined }) {
    if (!sourceData || !sourceData.length) {
      return null;
    }
    const { legendData, xAxisData, seriesData } = dataParser.parseBarOrLineData(
      sourceData,
      x,
      y,
      z,
      fixXAxisData,
      sortLegendData,
      sortXConfig
    );

    const series = [];
    seriesData.forEach((item, index) => {
      const seriesConfig = {
        name: legendData[index],
        type: 'line',
        symbolSize: 0,
        lineStyle: {
          width: 2
        },
        areaStyle: {
          normal: {
            color: defaultColor[index].areaColor
          }
        },
        data: item.data,
        smooth: true
      };
      series.push(seriesConfig);
    });

    return {
      color: defaultColor.map(item => {
        return item.color;
      }),
      title: {
        text: '',
        left: 20,
        textStyle: {
          color: '#fff',
          fontSize: 16,
          fontFamily: 'PingFangSC-Regular',
          fontWeight: 'normal'
        }
      },
      legend: {
        show: legendData.length > 1,
        data: legendData,
        right: 24,
        itemGap: 27,
        itemHeight: 16,
        itemWidth: 16,
        icon: 'rect',
        textStyle: {
          color: '#999999',
          fontSize: 14,
          fontFamily: 'PingFangSC-Regular'
        }
      },
      tooltip: {
        trigger: 'axis',
        show: true,
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#999999',
            show: false
          }
        }
      },
      grid: {
        top: '42',
        left: '45',
        right: '47',
        bottom: '0%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#DCDDE0'
            }
          },
          axisLabel: {
            color: '#999999',
            fontFamily: 'PingFangSC-Regular',
            fontWeight: 400
          },
          axisTick: {
            length: 8,
            lineStyle: {
              width: 2,
              color: 'rgba(255,255,255,0.2)'
            }
          },
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            color: '#DCDDE0'
          },
          axisLine: {
            lineStyle: {
              color: '#DCDDE0'
            }
          },
          axisLabel: {
            color: '#999999',
            fontFamily: 'PingFangSC-Regular',
            fontWeight: 400
          },
          minInterval: 1,
          show: true
        }
      ],
      series: series
    };
  }
};
