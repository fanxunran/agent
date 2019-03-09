import dataParser from './dataParser.js';
import echarts from 'echarts';

const defaultColor = [
  '#B386F2',
  '#1C4EDD',
  '#2DAAFF',
  '#d48265',
  '#91c7ae',
  '#749f83',
  '#ca8622',
  '#bda29a',
  '#6e7074',
  '#546570',
  '#c4ccd3'
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
   * @returns {{yAxis: {type: string}[], xAxis: {data: Array, type: string}[], color: string[], legend: {data: Array}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: Array, tooltip: {axisPointer: {type: string}, trigger: string}}}
   */
  assembleBarXOptions(sourceData, x, y, z, fixXAxisData, sortLegendData, sortXConfig = { sortBy: undefined }) {
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
    seriesData.forEach((series, index) => {
      series.name = legendData[index];
      series.type = 'bar';
      series.barMaxWidth = '50px' /*bar的最大宽度50px*/;
    });

    return {
      color: defaultColor,
      tooltip: {
        trigger: 'axis',
        show: true,
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: legendData,
        show: legendData.length > 1 /*是否展示legend*/,
        right: '70' /*legend右边的距离*/
      },
      grid: {
        left: '45',
        right: '47',
        bottom: '24',
        top: '42',
        containLabel: true,
        borderColor: 'white' /*白色隐藏border*/,
        show: true /*是否展示网格线*/
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          nameTextStyle: {
            color: '#999999',
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: 'PingFangSC-Regular'
          },
          axisTick: {
            show: false /*是否展示x轴刻度*/
          },
          axisLine: {
            show: true /*是否展示x轴线*/,
            lineStyle: {
              color: '#DCDDE0'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          nameTextStyle: {
            color: '#999999',
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: 'PingFangSC-Regular'
          },
          axisTick: {
            show: true /*是否展示y轴刻度*/
          },
          splitLine: {
            show: true /*是否展示y轴分割线*/
          },
          axisLine: {
            show: true /*是否展示y轴线*/,
            lineStyle: {
              color: '#DCDDE0'
            }
          },
          axisLabel: {
            show: true /*是否展示y轴label*/,
            lineStyle: {
              color: '#DCDDE0'
            }
          }
        }
      ],
      series: seriesData
    };
  },

  /**
   * 组装柱状图Options,常规以x为横轴，y展示数据
   * @param sourceData 源数据，数组
   * @param x 横坐标要展示的值在sourceData数组中的字段
   * @param y 纵坐标要展示的值在sourceData数组中的字段
   * 如数据源是[{date: '10/1', salesVolume: 100}]
   * 那么x的值传date,y的值传salesVolume
   * @param fixXAxisData 确定的x轴坐标list，不传则从数据里解析
   * @returns {{yAxis: {type: string}[], xAxis: {data: Array, type: string}[], color: string[], legend: {data: Array}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: Array, tooltip: {axisPointer: {type: string}, trigger: string}}}
   */
  assembleBarXShadowOptions(sourceData, x, y, fixXAxisData) {
    if (!sourceData || !sourceData.length) {
      return null;
    }
    const { legendData, xAxisData, seriesData } = dataParser.parseBarOrLineData(
      sourceData,
      x,
      y,
      null,
      fixXAxisData,
      null,
      null
    );
    let maxValue = 0;
    seriesData.forEach((series, index) => {
      series.name = legendData[index];
      series.type = 'bar';
      series.barBorderRadius = 12;
      series.barMaxWidth = '12px' /*bar的最大宽度50px*/;
      series.itemStyle = {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#5BC1FF'
            },
            {
              offset: 1,
              color: '#2E8DFF'
            }
          ]),
          barBorderRadius: 12
        }
      };
      series.label = {
        normal: {
          show: true, //显示数字
          position: 'top' //这里可以自己选择位置
        }
      };
      series.barGap = '-100%';
      series.data.forEach(item => {
        if (item > maxValue) {
          maxValue = item;
        }
      });
    });
    const shadowSeries = {
      name: 'shadow',
      type: 'bar',
      silent: true,
      barMaxWidth: '12px' /*bar的最大宽度50px*/,
      itemStyle: {
        normal: {
          color: '#DCDDE0',
          barBorderRadius: 12
        }
      },
      data: new Array(xAxisData.length).fill(maxValue)
    };
    seriesData.unshift(shadowSeries);

    return {
      color: defaultColor,
      tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: legendData,
        show: legendData.length > 1 /*是否展示legend*/,
        right: '70' /*legend右边的距离*/
      },
      grid: {
        left: '45',
        right: '47',
        bottom: '24',
        top: '42',
        containLabel: true,
        borderColor: 'white' /*白色隐藏border*/,
        show: false /*是否展示网格线*/
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            interval: 0 /*设置x轴的每个值都显示*/,
            color: '#333333',
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: 'PingFangSC-Regular'
          },
          axisTick: {
            show: false /*是否展示x轴刻度*/
          },
          axisLine: {
            show: false /*是否展示x轴线*/,
            lineStyle: {
              color: '#DCDDE0'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          nameTextStyle: {
            color: '#999999',
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: 'PingFangSC-Regular'
          },
          axisTick: {
            show: false /*是否展示y轴刻度*/
          },
          splitLine: {
            show: false /*是否展示y轴分割线*/
          },
          axisLine: {
            show: false /*是否展示y轴线*/,
            lineStyle: {
              color: '#DCDDE0'
            }
          },
          axisLabel: {
            show: false /*是否展示y轴label*/,
            lineStyle: {
              color: '#DCDDE0'
            }
          }
        }
      ],
      series: seriesData
    };
  },

  /**
   * 组装条形图Options，以y为横轴，x轴展示数据
   * @param sourceData 源数据，数组
   * @param x 横坐标要展示的值在sourceData数组中的字段
   * @param y 纵坐标要展示的值在sourceData数组中的字段
   * @param z 展示的值的标签
   * 如数据源是[{date: '10/1', salesVolume: 100, level: '高'}]
   * 那么x的值传date,y的值传salesVolume，z的值传level
   * @param fixXAxisData 确定的x轴坐标list，不传则从数据里解析
   * @param sortIndex 排行数字
   * @returns {yAxis: {axisLabel: {formatter: axisLabel.formatter, margin: number, rich: {a: {backgroundColor: string, borderRadius: number[], color: string, width: number, fontSize: number, align: string, height: number}, b: {backgroundColor: string, borderRadius: number[], color: string, width: number, fontSize: number, align: string, height: number}}, align: string}, inverse: boolean, data: *, axisLine: {show: boolean}, axisTick: {show: boolean}, type: string}[], xAxis: {min: number, max: number, show: boolean, type: string}[], color: echarts.graphic.LinearGradient, legend: {data: Array, show: boolean}, grid: {top: string, left: number, bottom: string, right: number}, series: Array, tooltip: {}} || {{yAxis: {axisLabel: {formatter: axisLabel.formatter, margin: number, rich: {a: {backgroundColor: string, borderRadius: number[], color: string, width: number, fontSize: number, align: string, height: number}, b: {backgroundColor: string, borderRadius: number[], color: string, width: number, fontSize: number, align: string, height: number}}, align: string}, inverse: boolean, data: *, axisLine: {show: boolean}, axisTick: {show: boolean}, type: string}[], xAxis: {min: number, max: number, show: boolean, type: string}[], color: echarts.graphic.LinearGradient, legend: {data: Array, show: boolean}, grid: {top: string, left: number, bottom: string, right: number}, series: Array, tooltip: {}}}
   */
  assembleBarYOptions(sourceData, x, y, z, sortIndex, shadow = false) {
    if (!sourceData || !sourceData.length) {
      return null;
    }
    let maxValue = 0;
    sourceData.forEach(item => {
      if (Math.abs(item[y]) > Number(maxValue)) {
        maxValue = Math.abs(item[y]);
      }
    });
    sourceData = sourceData.slice(sortIndex, 10 + sortIndex);
    if (!sourceData || !sourceData.length) {
      return {};
    }
    const { legendData, xAxisData, seriesData } = dataParser.parseBarOrLineData(sourceData, x, y, z, null, null, null);
    seriesData.forEach((series, index) => {
      series.name = legendData[index];
      series.type = 'bar';
      series.barWidth = '12';
      series.itemStyle = {
        normal: {
          barBorderRadius: [10, 10, 10, 10]
        }
      };
      series.barGap = '-100%';
      let barData = [];
      series.data.forEach((item, i) => {
        let bar = {};
        bar.value = item;
        if (item < 0) {
          bar.value = -item;
          bar.Symbol = '-';
          bar.itemStyle = {
            color: 'rgba(255, 50, 122, 1)'
          };
        }
        barData.push(bar);
      });
      series.data = barData;
    });
    for (let i = 0; i < 10; i++) {
      if (!xAxisData[i]) {
        xAxisData.push('');
      }
    }
    if (shadow) {
      const shadowSeries = {
        name: 'shadow',
        type: 'bar',
        barMaxWidth: '12px' /*bar的最大宽度50px*/,
        itemStyle: {
          normal: {
            color: '#F2F4F7',
            barBorderRadius: 12
          }
        },
        tooltip: {
          show: false
        },
        silent: true,
        data: new Array(sourceData.length).fill(maxValue)
      };
      seriesData.unshift(shadowSeries);
    }
    return {
      color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
        {
          offset: 0,
          color: '#5BC1FF'
        },
        {
          offset: 1,
          color: '#2E8DFF'
        }
      ]),
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'none' },
        formatter: function(params) {
          let customSymbol = '';
          if (params[0].data && params[0].data.Symbol) {
            customSymbol = params[0].data.Symbol;
          }
          return params[0].name + ' : ' + customSymbol + params[0].value;
        }
      },
      legend: {
        data: legendData,
        show: false
      },
      grid: {
        top: '19',
        bottom: '5',
        left: 190,
        right: 70
      },
      yAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisLine: {
            show: false
          },
          inverse: true,
          axisLabel: {
            margin: 190,
            align: 'left',
            formatter: function(value, index) {
              value = value.substring(0, 13);
              if (value === '') {
                return `   ${value}`;
              }
              if (index + sortIndex + 1 < 4) {
                return `{a|${index + sortIndex + 1}}   ${value}`;
              } else {
                return `{b|${index + sortIndex + 1}}   ${value}`;
              }
            },
            rich: {
              a: {
                width: 18,
                height: 18,
                borderRadius: [10, 10, 10, 10],
                align: 'center',
                fontSize: 10,
                backgroundColor: '#3879FB',
                color: '#fff'
              },
              b: {
                width: 18,
                height: 18,
                borderRadius: [10, 10, 10, 10],
                align: 'center',
                fontSize: 10,
                backgroundColor: '#C4D8FF',
                color: '#fff'
              }
            }
          },
          axisTick: {
            show: false
          }
        }
      ],
      xAxis: [
        {
          show: false,
          type: 'value',
          max: maxValue,
          min: 0
        }
      ],
      series: seriesData
    };
  }
};
