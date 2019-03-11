import dataParser from './dataParser.js';
import echarts from 'echarts';
const defaultColor = ['#7EB9FF', '#50DAC3', '#B386F2', '#FFD392', '#FF924E'];
const gradualColor = [
  new echarts.graphic.LinearGradient(1, 0, 0, 0, [
    {
      offset: 0,
      color: '#32FFEA'
    },
    {
      offset: 1,
      color: '#32FFEA'
    }
  ]),
  '#FFD032',
  '#FF327A',
  '#324EFF',
  '#FF5454'
];
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
      //配置渐变色
      color: defaultColor,//配置各个部分的颜色,defaultColor单色,gradualColor渐变
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
            color: '#999999',
            formatter: '{b} : {c} ({d}%)',//{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
            // position: 'center',
            show: true,
            textStyle: {//内容的样式
              color: '#333333',
              fontSize: 12,
              fontWeight: 400,
              fontFamily: 'PingFangSC-Regular'
            },
            // rich: {
            //   percent: {
            //     fontSize: 20,
            //     color: '#fff',
            //     fontFamily: 'din',
            //     verticalAlign: 'bottom'
            //   }
            // }
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
