import dataParser from './dataParser.js';

const defaultColor = ['#7EB9FF', '#50DAC3', '#B386F2', '#FFD392', '#FF924E'];

export default {
  /**
   * 饼图
   * @param sourceData :  数据[{name: 'x, value: '1'}]
   *
   */
  pie(sourceData) {
    //数据格式, 获取 data 中的 key
    let keys = [];
    Object.keys(sourceData[0]).forEach(item => {
      keys.push(item);
    });
    let seriesData = dataParser.parseWithoutGroup(sourceData, keys[0], keys[1]);
    return {
      color: defaultColor,//配置各个部分的颜色
      //标题
      title: {
        text: '', //标题
        subtext: '', //副标题
        x: 'left' //位置默认居中
      },
      //提示
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      //组建
      legend: {
        show: false,
        orient: 'horizontal', //垂直：vertical； 水平 horizontal
        bottom: 'bottom',
        right: 'right',
        data: seriesData.categories
      },
      series: [
        {
          name: 'title' || '',
          type: 'pie', //类型
          radius: ['30%', '43%'], //圆的大小
          center: ['50%', '50%'], //位置居中
          avoidLabelOverlap: false, //hover 时的联动高亮
          hoverAnimation: false, //hover 在扇区上的放大动画效果
          data: seriesData.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              color: '#333333',
              formatter: '{b}\n\n{c}'
            }
          },
          //引导线
          labelLine: {
            normal: {
              show: true,
              length: 30
            }
          }
        }
      ]
    };
  }
};
