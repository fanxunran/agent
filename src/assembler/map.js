import dataParser from './dataParser.js';
const defaultColor = ['#7EB9FF', '#50DAC3', '#B386F2', '#FFD392', '#FF924E'];

export default {
  /**
   * 组装地图Options,常规以x为横轴，y展示数据
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
  assembleMapOptions(sourceData, x, y, z){
    if(!sourceData || !sourceData.length){
      return null;
    };

    //数据格式, 获取 seriesData 中的 key
    let seriesData = dataParser.parseMapData(sourceData, x, y, z);
    const series = [];
    Object.keys(seriesData.dataMap).forEach((key, index) => {

        const seriesConfig = {
          name: key,
          type: 'map',
          geoIndex: index,
          data: seriesData.dataMap[key]
        };
        series.push(seriesConfig);
    });

    return {
      //配置渐变色
      color: defaultColor,//配置各个部分的颜色,defaultColor单色,gradualColor渐变
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          if (Number.isNaN(params.value)) {
            return params.name;
          } else {
            return params.seriesName + params.name + ':' + params.value + '%';
          }
        }
      },
      legend: {
        show: true,
        icon: 'circle',//图表的样式rect，circle
        textStyle: {//内容的样式
          color: '#333333',
          fontSize: 12,
          fontWeight: 400,
          fontFamily: 'PingFangSC-Regular'
        },
        orient: 'horizontal', //垂直：vertical； 水平 horizontal
        bottom: 'bottom',
        right: 'right',
        data: Object.keys(seriesData.dataMap)
      },
      visualMap: {
        type: 'continuous',
        min: 0,
        left: 'left',
        top: 'bottom',
        realtime: false,
        text: ['高', '低'],
        inRange: {
          color: ['#e0ffff', '#006edd']
        },
        calculable: true
      },
      geo: {
        map: 'china',
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        selectedMode: 'multiple',
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
      series: series
    };
  }
};
